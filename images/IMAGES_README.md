# Portfolio Images

Place your portfolio-related images in this folder.

> **✨ Automatic Optimization:** Images are automatically resized and optimized on every commit via GitHub Actions. Just upload your images and let the automation handle optimization!

## Structure

```
images/
├── profile.jpg          # Your profile photo (auto-resized to 400x400px)
├── projects/           # Project screenshots (auto-optimized to <500KB)
│   ├── project-1.jpg
│   ├── project-2.jpg
│   └── ...
└── IMAGES_README.md           # This file
```

---

## 🤖 Automated Image Optimization

### What Happens Automatically

When you commit images to this folder, a GitHub Actions workflow automatically:

1. **Detects changes** — Only processes modified/added images
2. **Validates sizes** — Checks against predefined requirements
3. **Optimizes images** — Resizes and compresses as needed
4. **Commits back** — Pushes optimized images automatically (if changes needed)

### Image Rules

| Image Type | Rule | Automated Action |
|------------|------|------------------|
| **Profile Photo** (`profile.jpg/png`) | 400x400px square | Crops to exact dimensions, centered |
| **Project Images** (`projects/*.{jpg,png}`) | Max 1200x800px, <500KB | Maintains aspect ratio, compresses to <500KB |
| **certificate Images** (`certificates/*.{jpg,png}`) | Max 1200x800px, <500KB | Maintains aspect ratio, compresses to <500KB |
| **Quality** | All images | 85% JPEG quality (optimal for web) |

### Supported Formats
- ✅ `.jpg` / `.jpeg`
- ✅ `.png`
- ✅ `.webp`

---

## 📋 Manual Image Guidelines

While automation handles optimization, following these guidelines helps maintain quality:

### Profile Photo
- **Size**: 400x400px (will be auto-cropped if different)
- **Format**: JPG or PNG
- **Style**: Professional headshot, square aspect ratio
- **Tip**: Upload at least 400x400px to avoid upscaling

### Project Images
- **Max Dimensions**: 1200x800px (larger images will be resized)
- **File Size**: <500KB (automatically compressed if larger)
- **Aspect Ratio**: 16:9 or 4:3 recommended (maintains aspect ratio)
- **Format**: JPG for photos, PNG for screenshots with transparency
- **Naming**: Use lowercase with hyphens (e.g., `document-pipeline.jpg`)

### Best Practices
1. **Higher resolution is better** — Upload large images; automation will optimize them
2. **Avoid pre-compressed images** — Let the workflow handle compression for consistency
3. **Use descriptive names** — Helps with organization (e.g., `aws-pipeline-dashboard.jpg`)
4. **Group related images** — Consider using subfolders in `projects/` if you have many images

---

## 💻 Local Optimization (Optional)

Want to optimize images locally before committing? Run the script manually:

### Requirements
```bash
pip install Pillow
```

### Run Optimizer
```bash
# From portfolio root directory
python scripts/optimize-images.py
```

### Output Example
```
  Portfolio Image Optimizer
============================================================

 Scanning images in: images/

 Processing Profile photo: profile.jpg
 Optimized: profile.jpg
   Size: (800, 600) → (400, 400)
   File: 245.3KB → 62.1KB

 Processing Project images in projects/

 Optimized: my-project.jpg
   Size: (2400, 1600) → (1200, 800)
   File: 1240.5KB → 387.2KB
    Reduced quality to 80% to meet file size limit

 Already optimized: another-project.png (156.3KB)

============================================================
 Summary:
   Images checked: 3
   Images optimized: 2
   No changes needed: 1
============================================================
```

---

## 🔧 Customizing Optimization Rules

To modify image size requirements, edit [`scripts/optimize-images.py`](../scripts/optimize-images.py):

```python
IMAGE_RULES = {
    'profile.jpg': {
        'max_size': (400, 400),  # Change dimensions here
        'crop': True,
        'description': 'Profile photo'
    },
    'projects': {
        'max_size': (1200, 800),      # Max dimensions for projects
        'max_file_size_kb': 500,      # File size limit
        'crop': False,
        'description': 'Project images'
    }
}

QUALITY = 85  # JPEG quality (60-95)
```

---

## 📖 Usage in Content

Reference images in [`js/content.js`](../js/content.js) using relative paths:

```js
// Profile photo
"photoUrl": "images/profile.jpg",

// Project images (single)
"images": ["images/projects/project-name.jpg"],

// Project images (multiple - creates slider)
"images": [
  "images/projects/project-1.jpg",
  "images/projects/project-2.jpg",
  "images/projects/project-3.jpg"
]
```

---

## ❓ FAQ

**Q: What if I upload a really large image?**
A: The workflow automatically resizes it to fit within the max dimensions (1200x800px for projects) and compresses to <500KB.

**Q: Will my original images be replaced?**
A: Yes, optimized images replace originals. The automation commits the optimized versions. Keep backups of originals if needed.

**Q: Can I disable automatic optimization?**
A: Yes, delete or disable the `.github/workflows/optimize-images.yml` file. You can still run optimization manually with `python scripts/optimize-images.py`.

**Q: What if the workflow fails?**
A: Check the Actions tab in your GitHub repository for error logs. Most common issues: unsupported image format or corrupted files.

**Q: Does this work with private repositories?**
A: Yes! GitHub Actions work in both public and private repositories with no additional configuration.

**Q: What about background removal or other edits?**
A: The automation only handles resizing and compression. Do any creative edits (cropping, filters, background removal) before uploading.

---

## 🚀 Workflow Details

### GitHub Actions Workflow
Located at: `.github/workflows/optimize-images.yml`

**Triggers:**
- Push to `main` branch with image changes
- Pull requests with image changes

**What it does:**
1. Detects changed image files
2. Runs Python optimization script
3. Commits optimized images (if needed)
4. Generates optimization report in Actions summary

**Bot commits:**
- Committed by: `github-actions[bot]`
- Commit message: `🤖 Auto-optimize portfolio images [skip ci]`
- Note: `[skip ci]` prevents infinite loop of workflow triggers

---
