#!/usr/bin/env python3
"""
Portfolio Image Optimizer
Automatically resizes and optimizes images according to portfolio guidelines:
- Profile photos: 400x400px (square)
- Project images: Maintain aspect ratio, optimize to <500KB
- Certificate images: Maintain aspect ratio, optimize to <500KB
- Quality: 85% for web performance
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageOps

# Configuration
IMAGE_RULES = {
    'profile.jpg': {
        'max_size': (400, 400),
        'crop': True,  # Crop to exact dimensions
        'description': 'Profile photo'
    },
    'profile.png': {
        'max_size': (400, 400),
        'crop': True,
        'description': 'Profile photo'
    },
    'projects': {
        'max_size': (1200, 800),  # Max dimensions, maintains aspect ratio
        'crop': False,
        'max_file_size_kb': 500,
        'description': 'Project images'
    },
    'certificates': {
        'max_size': (1200, 800),  # Max dimensions, maintains aspect ratio
        'crop': False,
        'max_file_size_kb': 500,
        'description': 'Certificate images'
    }
}

QUALITY = 85  # JPEG quality (1-95, higher = better quality but larger file)
SUPPORTED_FORMATS = {'.jpg', '.jpeg', '.png', '.webp'}

def get_image_size_kb(file_path):
    """Get file size in KB"""
    return os.path.getsize(file_path) / 1024

def optimize_image(image_path, max_size, crop=False, max_file_size_kb=None):
    """
    Optimize image according to rules
    
    Args:
        image_path: Path to image file
        max_size: Tuple of (width, height)
        crop: If True, crop to exact size. If False, resize maintaining aspect ratio
        max_file_size_kb: Maximum file size in KB (for iterative quality reduction)
    
    Returns:
        bool: True if image was modified, False otherwise
    """
    try:
        img = Image.open(image_path)
        original_size = img.size
        original_file_size = get_image_size_kb(image_path)
        modified = False
        
        # Convert RGBA to RGB if saving as JPEG
        if img.mode == 'RGBA' and image_path.suffix.lower() in ['.jpg', '.jpeg']:
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])  # 3 is the alpha channel
            img = background
            modified = True
        
        # Handle different optimization strategies
        if crop:
            # Crop to exact dimensions (for profile photos)
            img = ImageOps.fit(img, max_size, Image.Resampling.LANCZOS, centering=(0.5, 0.5))
            modified = True
        else:
            # Resize maintaining aspect ratio (for project images)
            if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                modified = True
        
        # Save with optimization
        if modified or (max_file_size_kb and original_file_size > max_file_size_kb):
            save_kwargs = {
                'optimize': True,
                'quality': QUALITY
            }
            
            # For PNG, use different optimization
            if image_path.suffix.lower() == '.png':
                save_kwargs = {
                    'optimize': True
                }
            
            img.save(image_path, **save_kwargs)
            
            # Iteratively reduce quality if file is still too large
            if max_file_size_kb:
                quality = QUALITY
                attempts = 0
                max_attempts = 5
                
                while get_image_size_kb(image_path) > max_file_size_kb and quality > 60 and attempts < max_attempts:
                    quality -= 5
                    attempts += 1
                    img.save(image_path, optimize=True, quality=quality)
                
                if attempts > 0:
                    print(f"  Reduced quality to {quality}% to meet file size limit")
            
            new_size = img.size
            new_file_size = get_image_size_kb(image_path)
            
            print(f"  Optimized: {image_path.name}")
            print(f"   Size: {original_size} → {new_size}")
            print(f"   File: {original_file_size:.1f}KB → {new_file_size:.1f}KB")
            
            return True
        else:
            print(f" Already optimized: {image_path.name} ({original_file_size:.1f}KB)")
            return False
    
    except Exception as e:
        print(f" Error processing {image_path}: {e}", file=sys.stderr)
        return False

def process_images():
    """Process all images in the portfolio"""
    portfolio_root = Path(__file__).parent.parent
    images_dir = portfolio_root / 'images'
    
    if not images_dir.exists():
        print(f"Images directory not found: {images_dir}")
        return False
    
    print(f"Scanning images in: {images_dir}\n")
    
    modified_count = 0
    checked_count = 0
    
    # Process profile photos
    for profile_name in ['profile.jpg', 'profile.png']:
        profile_path = images_dir / profile_name
        if profile_path.exists():
            checked_count += 1
            rules = IMAGE_RULES[profile_name]
            print(f" Processing {rules['description']}: {profile_name}")
            if optimize_image(profile_path, rules['max_size'], crop=rules['crop']):
                modified_count += 1
            print()
    
    # Process project images
    projects_dir = images_dir / 'projects'
    if projects_dir.exists():
        rules = IMAGE_RULES['projects']
        print(f"\n Processing {rules['description']} in projects/\n")
        
        for image_path in projects_dir.rglob('*'):
            if image_path.is_file() and image_path.suffix.lower() in SUPPORTED_FORMATS:
                checked_count += 1
                if optimize_image(
                    image_path, 
                    rules['max_size'], 
                    crop=rules['crop'],
                    max_file_size_kb=rules['max_file_size_kb']
                ):
                    modified_count += 1
    
    # Summary
    print("\n" + "="*60)
    print(f"   Summary:")
    print(f"   Images checked: {checked_count}")
    print(f"   Images optimized: {modified_count}")
    print(f"   No changes needed: {checked_count - modified_count}")
    print("="*60)
    
    return modified_count > 0

if __name__ == '__main__':
    print("Portfolio Image Optimizer")
    print("="*60 + "\n")
    
    try:
        has_changes = process_images()
        sys.exit(0 if has_changes else 0)  # Exit 0 regardless (workflow handles commits)
    except Exception as e:
        print(f"\n Fatal error: {e}", file=sys.stderr)
        sys.exit(1)
