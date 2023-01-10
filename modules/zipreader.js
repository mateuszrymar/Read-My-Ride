
const getZip = async(blob) => {
  var zip = new JSZip();

  var fs = require("fs");
  var JSZip = require("jszip");

  // read a zip file
  fs.readFile("test.zip", function(err, data) {
      if (err) throw err;
      JSZip.loadAsync(data).then(function (zip) {
          // ...
      });
  });

  return {
    unzippedText,
    fileSize
  }
}

export { getZip }