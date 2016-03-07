var fs = require('fs');
var semver = require('semver');

/**
 * Take a wordpress theme stylesheet and increment the version number
 */
module.exports = function (filePath, releaseType) {

    //default semver inc release type
    releaseType = releaseType || 'patch';

    var r = /(V|v)ersion\:\s*([0-9\.]+)/;

    if(!filePath){
        throw('File path argument must be provided.');
    }

    fs.readFile(filePath, 'utf8', function(err, str){
        if(err){
            throw(err);
        }
        else if(!str){
            throw('No content found in ' + filePath);
        }
        else{

            //find the version
            var matches = str.match(r);

            if (!matches) {
                throw('Could not find version in stylesheet.');
            }

            var version = matches[2];

            if (!semver.valid(version)) {
                throw('Stylesheet does not contain a valid semver. Found "' + version + '".');
            }

            //increment the version
            var incrementedVersion = semver.inc(version, releaseType);

            //replace the version number
            str = str.replace(version, incrementedVersion);

            //write the contents back to stylesheet
            fs.writeFile(styleFile, str, function(err) {
                if (err){
                    throw err;
                }
            });
        }
    });


}
