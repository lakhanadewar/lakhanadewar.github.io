using Ace.Server.Core.Event;
using Ace.Server.Core.References;
using Ace.Server.Vision;
using Ace.Server.Vision.Integration;
using Ace.Server.Vision.Integration.Tools;
using Ace.Server.Vision.Parameters;
using Ace.Server.Vision.Tools;
using Ace.Server.Vision.Tools.ImageSources;
using Ace.Services.CloneService;
using Ace.Services.DataLock;
using Ace.Services.EmulationMode;
using Ace.Services.License;
using Ace.Services.LogService;
using Ace.Services.IdentityManager;
using Ace.Services.Vision.Execution;
using Ace.Services.Vision.ImageBuffer;
using HexSightNet;
using Omron.Cxap.Modules.Language.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Runtime.Serialization;
using System.Security.Permissions;
using Ace.Services.References;
using Ace.Util;
namespace Ace.Server.Vision.Tools.ColorMatching {
	[Serializable]
	[PCLicenseRequiredAttribute(PCLicense.AdeptSight)]
	public class ColorMatchingTool : VisionImageSource, IRectangularRoiTool, IColorMatchingTool {
		private ColorMatchingEx tool = new ColorMatchingEx();
		private string sourceBufferName = "_Source_Buffer_";
		private ImageBuffer2D buffer;
		private DateTime inputImageLastAcquisitionTime;
		private IReference inputImageReference;
		private ResultsColumnCollection resultsColumns;
		private VisionRectangularSearchRegion searchRegion;
		private InputParameterTransform parentToolInput;
		private bool outputAsGrayscaleImage;
		private VisionTransform offset = new VisionTransform(0, 0, 0);
		private bool bilinearInterpolationEnabled = true;
		private SamplingStepConfiguration customSamplingStep;
		private List<ColorFilter> filters = new List<ColorFilter>();
		[NonSerialized]
		private List<FilterResult> results = new List<FilterResult>();
		private readonly object resultsLock = new object();
		private string BufferName {
			get {
				return this.Identifier.ToString();
			}
		}
        [Browsable(false)]
		public override ICameraCalibration ActiveCalibration {
			get {
				ICameraCalibration calibration = null;
				IVisionImageSource imageSource = ImageSource;
				if (imageSource != null) {
					// If the image source has an active calibration, use it otherwise, if it is a virtual camera
					// then use the default device calibration
					if (imageSource.ActiveCalibration != null) {
						calibration = ImageSource.ActiveCalibration;
					} else {
						IVirtualCamera virtualCamera = imageSource as IVirtualCamera;
						if (virtualCamera != null)
							calibration = virtualCamera.Device?.Calibration;
					}					
				}
				return calibration;				
			}
			set { }
		}
		[Browsable(false)]
		public override IImageBuffer2D Buffer {
			get {
				CheckBuffer();
				return buffer;
			}
		}
		protected override bool LockImageBuffer() {
			base.LockImageBuffer();
			if (buffer != null)
				buffer.VisionSystem.Lock();
			return true;
		}		
		protected override void UnlockImageBuffer() {			
			base.UnlockImageBuffer();
			if (buffer != null)
				buffer.VisionSystem.Unlock();
		}
		[Browsable(true)]
		[Category("ToolLinks")]
        [PropertySortOrder(0)]
		[ReferenceScope(ReferenceSelectorScope.CurrentDevice)]
		public IVisionImageSource ImageSource {
			get {
				return (IVisionImageSource) inputImageReference.Ref;
			}
			set {
				if (inputImageReference.Ref == value)
					return;
				inputImageReference.Ref = value;
				OnPropertyModified("ImageSource");
			}
		}
		[Browsable(false)]
		public bool IsImageSourceValid {
			get {
				if (this.ImageSource == null)
					return false;
				if (this.ImageSource.Buffer == null)
					return false;
				return true;
			}
		}
		protected bool areResultsAvailable;
		[Browsable(false)]
		public virtual bool ResultsAvailable {
			get { return areResultsAvailable; }
		}
		[Browsable(false)]
		public ResultsColumnCollection ResultsColumns {
			get { return resultsColumns; }
			set {
				resultsColumns = value;
				OnPropertyModified("ResultsColumns");
			}
		}
		[Category("RegionOfInterest")]
        [PropertySortOrder(1)]
        public VisionTransform Offset {
			get { return offset; }
			set {
				if (offset == value)
					return;
				offset = value;
				OnPropertyModified("Offset");
			}
		}
		[Browsable(false)]
		public VisionTransform[] Origins {
			get {
				// Initialize return array
				List<VisionTransform> origins = new List<VisionTransform>();
				// If a reference is defined, calculate the set of all possible tool execution locations
				if (ParentToolInput.IsReferenceDefined == true) {
					VisionTransform[] inputs = ParentToolInput.CurrentTransforms;
					foreach (VisionTransform input in inputs) {
						VisionTransform temp = input * offset;
						temp.Name = input.Name;
						temp.ResultsIdentifier = input.ResultsIdentifier;
						origins.Add(temp);
					}
				} else {
					// Otherwise, only 1 location is defined
					origins.Add(offset);
				}
				return origins.ToArray();
			}
		}
		[Category("RegionOfInterest")]
        [PropertySortOrder(1)]
		public VisionRectangularSearchRegion SearchRegion {
			get { return searchRegion; }
			set {
				if (searchRegion == value)
					return;
				searchRegion = value;
				OnPropertyModified("SearchRegion");
			}
		}
		[Category("RegionOfInterest")]
        [PropertySortOrder(0)]
		public InputParameterTransform ParentToolInput {
			get { return parentToolInput; }
			set {
				if (parentToolInput == value)
					return;
				if (parentToolInput != null)
					parentToolInput.PropertyModified -= new EventHandler<PropertyModifiedEventArgs>(parentToolInput_PropertyModified);
				parentToolInput = value;
				if (parentToolInput != null)
					parentToolInput.PropertyModified += new EventHandler<PropertyModifiedEventArgs>(parentToolInput_PropertyModified);
				OnPropertyModified("ParentToolInput");
			}
		}
		[Category("Properties")]
		public bool OutputAsGrayscaleImage {
			get {
				return outputAsGrayscaleImage;
			}
			set {
				if (outputAsGrayscaleImage == value)
					return;
				outputAsGrayscaleImage = value;
				OnPropertyModified("OutputAsGrayscaleImage");
			}
		} 
		[Category("Properties")]
		public bool BilinearInterpolationEnabled {
			get {
				return bilinearInterpolationEnabled;
			}
			set {
				if (bilinearInterpolationEnabled == value)
					return;
				bilinearInterpolationEnabled = value;
				OnPropertyModified("BilinearInterpolationEnabled");
			}
		} 
		[Category("Properties")]
		public SamplingStepConfiguration CustomSamplingStep {
			get {
				return customSamplingStep;
			}
			set {
				if (value == null)
					return;
				if (customSamplingStep == value)
					return;
				customSamplingStep = value;
				OnPropertyModified("CustomSamplingStep");
			}
		}
		[Category( "Filters" )]
		[TypeConverter( typeof( CollectionConverter ) )]
		[Browsable( false )]
		public List<ColorFilter> Filters {
			get { return filters; }
		}
		[Browsable(false)]
		[VisionOutputParameter(true)]
		public FilterResult[] Results {
			get {
				FilterResult[] instances;
				lock (resultsLock) {
					instances = results.ToArray();
				}
				return instances;
			}
		}
		public ColorMatchingTool(ILanguageService languageService,
									ILogService logService,
									IEmulationModeService emulationModeService,
									IVisionExecutionService visionExecutionService,
									IImageBuffer2DService imageBufferServer,
									IDataLockService dataLockService,
									ICloneService cloneService,
									IIdentityManagerService identityManagerService,
									IReferenceFactory referenceFactory) 
			: base(languageService, logService, emulationModeService, visionExecutionService, imageBufferServer, dataLockService, cloneService, identityManagerService, referenceFactory) {
			inputImageReference = referenceFactory.CreateReference();
			parentToolInput = new InputParameterTransform(referenceFactory);
			searchRegion = new VisionRectangularSearchRegion(50, 50);
			customSamplingStep = new SamplingStepConfiguration();
			parentToolInput.PropertyModified += new EventHandler<PropertyModifiedEventArgs>(parentToolInput_PropertyModified);
		}
		protected ColorMatchingTool(SerializationInfo info, StreamingContext context) 
			: base (info, context) { 
			if ( info == null )
				throw new ArgumentNullException( "info" ); 
			int filterCount = info.GetInt32( "Filter Count" ); 
			for ( int i = 0; i < filterCount; i++ ) {
				ColorFilter filter = (ColorFilter) info.GetValue( "Filter " + i, typeof(ColorFilter) );
				AddFilter(filter);
			}
			customSamplingStep = (SamplingStepConfiguration) info.GetValue("SamplingStep", typeof(SamplingStepConfiguration));			
			bilinearInterpolationEnabled = info.GetBoolean( "BilinearInterpolationEnabled" ); 
			this.ShowResultsGraphics = info.GetBoolean("Show Results Graphics");
			searchRegion = (VisionRectangularSearchRegion) info.GetValue("SearchRegion", typeof(VisionRectangularSearchRegion));
			offset = (VisionTransform) info.GetValue("Offset", typeof(VisionTransform));
			outputAsGrayscaleImage = info.GetBoolean("OutputAsGrayscaleImage"); 
			this.inputImageReference = (IReference) info.GetValue("Image Reference", typeof(IReference)); 
			this.parentToolInput = info.GetValue<InputParameterTransform>("ParentToolInput", null);
			if (parentToolInput == null) {
				parentToolInput = new InputParameterTransform(this.ReferenceFactory);
			}
			parentToolInput.PropertyModified += parentToolInput_PropertyModified;
		} 
		[SecurityPermissionAttribute(SecurityAction.Demand, SerializationFormatter = true)]
		public override void GetObjectData(SerializationInfo info, StreamingContext context) {
			base.GetObjectData(info, context);
			info.AddValue("SearchRegion", searchRegion);
			info.AddValue("Offset", offset, typeof(VisionTransform)); 
			info.AddValue("Image Reference", this.inputImageReference, typeof(IReference));
			info.AddValue("OutputAsGrayscaleImage", outputAsGrayscaleImage); 
			info.AddValue( "Filter Count", (int)filters.Count, typeof(Int32) ); 
			for ( int i = 0; i < filters.Count; i++ ) {
				info.AddValue( "Filter " + i, filters[i], filters[i].GetType() );
			} 
			info.AddValue("SamplingStep", CustomSamplingStep, typeof(SamplingStepConfiguration));
			info.AddValue("BilinearInterpolationEnabled", bilinearInterpolationEnabled); 
			info.AddValue<InputParameterTransform>("ParentToolInput", this.parentToolInput); 
		} 
		public override ReferenceCollection GetReferences() { 
			ReferenceCollection coll = base.GetReferences();
			coll.Add(this.inputImageReference);
			return coll; 
		} 
		protected override void Dispose(bool isDisposing) { 
			if (isDisposing == true) {
				if (Buffer != null) {
					this.ImageBufferServer.RemoveBuffer(buffer.Identifier);
					buffer.Dispose();
				}
			} 
			if (customSamplingStep != null) {
				customSamplingStep.Dispose();
				customSamplingStep = null;
			}
			if (tool != null) {
				tool.Dispose();
				tool = null;
			}
			if (filters != null) {
				foreach (var filter in filters) {
					filter.Dispose();
				}
				filters.Clear();
				filters = null;
			} 
			parentToolInput?.Dispose();
			parentToolInput = null; 
			base.Dispose(isDisposing);
		} 
		protected override void OnExecute() { 
			CheckBuffer(); 
			if (this.ImageSource == null) {
				throw new InvalidOperationException(string.Format(Translate("Ace.Exception_ImageSourceNotDefined"), this.Name));
			} 
			if (this.filters.Count == 0)
				throw new InvalidOperationException(Translate("Ace.Exception_NoFiltersAreDefined")); 
			ImageBuffer2D inBuffer = ImageSource.Buffer as ImageBuffer2D; 
			using (HSViewNET view = buffer.VisionSystem.GetView(sourceBufferName)) { 
				using (HSImageNET localImageSource = view.GetImage(sourceBufferName)) {
					using (HSImageNET image = inBuffer.Image) {
						localImageSource.CopyFrom(image); 
						localImageSource.Name = sourceBufferName;
					}
				}
			} 
			tool.SetInputBufferName(sourceBufferName); 
			tool.Properties.SamplingStepCustomEnabled = customSamplingStep.Enabled;
			tool.Properties.SamplingStepCustom = customSamplingStep.Step;
			tool.Properties.BilinearInterpolationEnabled = bilinearInterpolationEnabled; 
			tool.Properties.OutputFilterImageEnabled = true;
			tool.Properties.ClearOutputFilterImageEnabled = true; 
			tool.Properties.OutputFilterView = buffer.View.Name;
			using (HSImageNET image = buffer.Image) {
				tool.Properties.OutputFilterImage = image.Name;
			} 
			tool.Properties.UseAssociatedResultIdentifier = ParentToolInput.IsReferenceDefined;
			tool.Properties.Filters = Filters; 
			this.inputImageLastAcquisitionTime = this.ImageSource.LastAcquisitionTime; 
			VisionTransform[] transforms = this.Origins;
			if ( transforms.Length > 0 ) { 
				VisionTransform origin = transforms[0]; 
				tool.Properties.ToolX = (float)origin.X;
				tool.Properties.ToolY = (float)origin.Y;
				tool.Properties.Rotation = (float)origin.Degrees;
				tool.Properties.Width = (float)this.SearchRegion.Width;
				tool.Properties.Height = (float)this.SearchRegion.Height;
				tool.Properties.AssociatedResultName = origin.Name;
				tool.Properties.AssociatedResultIdentifier = origin.ResultsIdentifier;
				tool.Properties.AssociatedGroupNumber = origin.GroupIndex; 
				buffer.ExecuteTool(tool); 
				int count = tool.Results.Filters.Count;
				for (int j = 0; j < count; j++) {
					FilterResult filter = new FilterResult(tool.Results.Filters[j]); 
					filter.Position.X = tool.Properties.ToolX;
					filter.Position.Y = tool.Properties.ToolY;
					filter.Position.Degrees = tool.Properties.Rotation;
					filter.Position.Name = tool.Properties.AssociatedResultName;
					filter.Position.ResultsIdentifier = tool.Properties.AssociatedResultIdentifier;
					lock (resultsLock) {
						this.results.Add(filter);
					}
				} 
				if (outputAsGrayscaleImage == true) {
					using (HSViewNET view2 = buffer.VisionSystem.GetView(buffer.ViewName)) {
						using (HSImageNET outPutImage = view2.GetImage(buffer.ImageName)) {
							outPutImage.Type = HSImageNET.hsImageType.hs8bppGreyScale;
						}
					}
				} 
				this.RawExecutionTime += tool.Results.ExecutionTime; 
				tool.Properties.ClearOutputFilterImageEnabled = false; 
			} 
			this.buffer.UpdateImageCalibration(this.ActiveCalibration); 
			if (tool.Results.Filters.Count > 0)
				areResultsAvailable = true;
			else
				areResultsAvailable = false; 
			base.OnExecute(); 
		} 
		protected override void OnPreExecute() {
			var imageSource = this.ImageSource;
			if (imageSource?.Buffer?.CachedImage == null) {
				throw new InvalidOperationException(Translate("Ace.Exception_NoImageInBuffer"));
			}
		} 
		public InputParameterLink[] GetInputLinks() { 
			List<InputParameterLink> links = new List<InputParameterLink>(); 
			PropertyInfo[] properties = this.GetType().GetProperties();
			foreach (PropertyInfo property in properties) { 
				bool derived = property.PropertyType.IsSubclassOf(typeof(InputParameterLink)); 
				if (derived == true) {
					InputParameterLink link = (InputParameterLink) property.GetValue(this, null);
					links.Add(link);
				} 
			} 
			return links.ToArray(); 
		} 
		public override IVisionToolBase[] GetDependentTools() { 
			List<IVisionToolBase> tools = new List<IVisionToolBase>();
			if (this.ImageSource != null) {
				tools.Add(this.ImageSource);
			}
			var parentTool = this.parentToolInput.Reference;
			if (parentTool != null) {
				tools.Add(parentTool);
			} 
			return tools.ToArray(); 
		} 
		public override bool IsValidExecutionState() {
			if (this.ExecutionStatus == false)
				return false;
			if (this.ImageSource != null) {
				if (this.ImageSource.ExecutionStatus == false)
					return false;
				if (inputImageLastAcquisitionTime != this.ImageSource.LastAcquisitionTime)
					return false;
			} 
			return true;
		} 
		private void CheckBuffer() {  
			if ((buffer != null) || (ImageBufferServer == null))
				return;
			buffer = new ImageBuffer2D(LanguageService, LogService, CloneService, Identifier, true);
			ImageBufferServer.AddBuffer(buffer); 
			buffer.VisionSystem.AddView(sourceBufferName);
			using (HSViewNET view = buffer.VisionSystem.GetView(sourceBufferName)) {
				HSImageNET image = view.AddImage(sourceBufferName);
				image.Dispose();
			}
		} 
		public override void Clear() {
			lock (resultsLock) {
				this.results.Clear();
			}
			base.Clear();
		} 
		public ColorFilter AddFilter(ColorFilter cfilter) {
			ColorFilter cf = new ColorFilter( cfilter );
			cf.PropertyModified += ColorFilter_PropertyModified;
			filters.Add( cf );
			return cf;
		}
		 public ColorFilter GetFilter(int index) {
			ColorFilter cf = Filters[index];
			return cf;
		}
		public void RemoveFilter( int index ) {
			filters[index].PropertyModified -= ColorFilter_PropertyModified;
			filters.RemoveAt( index );
		}
		[Browsable(false)]
		public int FilterCount {
			get { return Filters.Count; }
		}
		public override void SaveConfiguration(string file) {
			if (this.tool == null)
				return;
			tool.SaveConfiguration(file);
		}
		private void parentToolInput_PropertyModified(object sender, PropertyModifiedEventArgs e) {
			OnPropertyModified("ParentToolInput");
		}
		private void ColorFilter_PropertyModified(object sender, PropertyModifiedEventArgs e) {
			OnPropertyModified(nameof(Filters));
		}
	}
}