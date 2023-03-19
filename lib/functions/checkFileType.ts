export const checkFileType = (src: string) => {
  const videoExts = new Array('mp4','avi','fiv','mov','wmv','webm');
  const imageExts = new Array('jpg', 'jpeg', 'png', 'svg');
  const pos = src.lastIndexOf('.');
	if (pos === -1) return '';

	const ext = src.slice(pos + 1);

  if (videoExts.indexOf(ext) !== -1) return 'video'
  else if(imageExts.indexOf(ext) !== -1) return 'image'
  else return ''
  
}