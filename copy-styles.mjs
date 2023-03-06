import fs from "fs";

fs.copyFile("src/PrinterFrame.css", "dist/PrinterFrame.css", (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log("PrinterFrame.css copied successfully.");
});

fs.copyFile("src/InkScripter.css", "dist/InkScripter.css", (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log("InkScripter.css copied successfully.");
});
