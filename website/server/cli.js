var fs = require('fs');
var cliReference = require('../../src/lib/cliOptions');

function buildTitle(option, name) {
  var title = '`' + name + '`';
  if(option.type) {
    title += ' [' + option.type + ']';
  }

  return title;
}

function generateToc() {
  var tocLines = Object.keys(cliReference).sort().map(function (name) {
    var option = cliReference[name];
    var anchor = buildTitle(option, name)
      .replace(/\s/g, '-')
      .replace(/[^A-Za-z0-9:-]/g, '')
      .toLowerCase();

    return '  - [`--' + name + '`](#' + anchor + ')';
  });

  return '\n\n' + tocLines.join('\n') + '\n\n';
}

function generateOptionContent(name) {
  var option = cliReference[name];

  // Title
  var content = '### ' + buildTitle(option, name) + '\n';

  // Additional informations
  if(option.alias) {
    content += '(alias `' + option.alias + '`)\n';
  }
  content += '\n';

  // Description
  content += option.description;
  content += '\n';

  return content;
}

function generateContent() {
  var optionContents = Object.keys(cliReference).sort().map(generateOptionContent);

  return '\n\n' + optionContents.join('\n') + '\n\n';
}

function execute() {
  var MD_DIR = '../docs/';

  var cliContent = fs.readFileSync(MD_DIR + 'CLI.md', {encoding: 'utf8'}).toString()
    .replace(
      /<generated_toc_start \/>[\s\S]*<generated_toc_end \/>/,
      '<generated_toc_start />' + generateToc() + '<generated_toc_end />'
    )
    .replace(
      /<generated_content_start \/>[\s\S]*<generated_content_end \/>/,
      '<generated_content_start />' + generateContent() + '<generated_content_end />'
    );
  fs.writeFileSync(MD_DIR + 'CLI.md', cliContent);
}

module.exports = execute;
