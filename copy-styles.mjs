import fs from 'fs';

fs.copyFile('stories/PrinterFrame.css', 'dist/PrinterFrame.css', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('PrinterFrame.css copied successfully.');
});

fs.copyFile('stories/InkScripter.css', 'dist/InkScripter.css', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('InkScripter.css copied successfully.');
});
