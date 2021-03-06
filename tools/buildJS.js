const browserify = require('browserify');
const fs         = require('fs');
const events    = require('./events');

const buildJS = (filename, inputJSPath, outputJSPath, isBuild) => {
    const startTime = events.onStart(filename);
    const src = browserify(inputJSPath, {
        insertGlobalVars: {
            IS_DEV: !isBuild,
        }
    })
        .transform('babelify',
            {
                presets: ['es2015', 'stage-0'],
                plugins: ['transform-runtime'],
            }
        );

    if (isBuild) {
        src
            .transform('uglifyify',
                {
                    dead_code: true,
                    global: true
                }
            );
    }

    src
        .bundle()
        .addListener('error', err => events.onError(err, src))
        .pipe(fs.createWriteStream(outputJSPath))
        .addListener('finish', () => events.onFinish(filename, outputJSPath, startTime));
};

module.exports = buildJS;
