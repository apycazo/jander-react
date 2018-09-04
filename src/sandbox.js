var raw = {
    "variables": {
        "docsPath": "http://localhost:3000/docs"
    },
    "docsPath": "http://localhost:3000/docs",
    "pages": [
        {
            "title": "sample page 1",
            "source": "$docsPath/page1.md"
        },
        {
            "title": "sample page 2",
            "source": "$docsPath/page2.md"
        }
    ]
};

const config = {};
raw.pages.forEach(page => {
    const ref = page.title.split(' ').join('+');
    page.source = page.source.replace('$docsPath', raw.docsPath);
    config[ref] = page;
});

console.log('Config:\n', JSON.stringify(config, null, 2));
Object.keys(config).forEach(entry => {
    console.log('Entry: ', JSON.stringify(entry, null, 2));
});