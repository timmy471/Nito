export const PDFViewer = ({ fileUrl }: { fileUrl: string }) => {
  if (!fileUrl.startsWith('https')) return <div></div>;
  return (
    <div className='pdf-viewer'>
      <iframe src={`${fileUrl}#view=fitH`} title='Pitch Deck' height='100%' width='100%' />
    </div>
  );
};
