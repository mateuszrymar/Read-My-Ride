import {
  BlobReader,
  // BlobWriter,
  // TextReader,
  TextWriter,
  ZipReader,
  // ZipWriter,
} from "https://deno.land/x/zipjs/index.js";

const getZip = async(blob) => {

  // ----
  // Write the zip file
  // ----


  // Creates a BlobWriter object where the zip content will be written.
  // const zipFileWriter = new BlobWriter();
  // Creates a TextReader object storing the text of the entry to add in the zip
  // (i.e. "Hello world!").
  // const helloWorldReader = new TextReader("Hello world!");

  // Creates a ZipWriter object writing data via `zipFileWriter`, adds the entry
  // "hello.txt" containing the text "Hello world!" via `helloWorldReader`, and
  // closes the writer.
  // const zipWriter = new ZipWriter(zipFileWriter);
  // await zipWriter.add("hello.txt", helloWorldReader);
  // await zipWriter.close();

  // Retrieves the Blob object containing the zip content into `zipFileBlob`. It
  // is also returned by zipWriter.close() for more convenience.
  const zipFileBlob = blob;

  // ----
  // Read the zip file
  // ----

  // Creates a BlobReader object used to read `zipFileBlob`.
  const zipFileReader = new BlobReader(zipFileBlob);
  // Creates a TextWriter object where the content of the first entry in the zip
  // will be written.
  const helloWorldWriter = new TextWriter();

  // Creates a ZipReader object reading the zip content via `zipFileReader`,
  // retrieves metadata (name, dates, etc.) of the first entry, retrieves its
  // content via `helloWorldWriter`, and closes the reader.
  const zipReader = new ZipReader(zipFileReader);

  
  const firstEntry = (await zipReader.getEntries()).shift();

  let fileSize = (firstEntry.uncompressedSize);
  let unzippedText = await firstEntry.getData(helloWorldWriter);
  await zipReader.close();

  return {
    unzippedText,
    fileSize
  }
}

export { getZip }