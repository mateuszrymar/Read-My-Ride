import {
  BlobReader,
  TextWriter,
  ZipReader,
} from "../../node_modules/@zip.js/zip.js/index.js";

const getZip = async(blob) => {
  const zipFileBlob = blob;

  // ----
  // Read the zip file
  // ----

  // Creates a BlobReader object used to read `zipFileBlob`.
  const zipFileReader = new BlobReader(zipFileBlob);
  // Creates a TextWriter object where the content of the first entry in the zip
  // will be written.
  const unzippedTextWriter = new TextWriter();

  // Creates a ZipReader object reading the zip content via `zipFileReader`,
  // retrieves metadata (name, dates, etc.) of the first entry, retrieves its
  // content via `helloWorldWriter`, and closes the reader.
  const zipReader = new ZipReader(zipFileReader);

  
  const firstEntry = (await zipReader.getEntries()).shift();

  let fileSize = (firstEntry.uncompressedSize);
  let unzippedText = await firstEntry.getData(unzippedTextWriter);
  await zipReader.close();

  return {
    unzippedText,
    fileSize
  }
}

export { getZip }