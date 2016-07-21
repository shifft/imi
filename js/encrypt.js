function generate(password, salt) {
  var md5one = md5(password, salt);
  var md5two = md5(md5one, 'isayme');
  var md5three = md5(md5one, 'heaven');

  var rule = md5three.split('');
  var source = md5two.split('');
  for (var i = 0; i <= 31; i++) {
    if (isNaN(source[i])){
      str = 'zsedcftgbhujmko13579';
      if (str.search(rule[i]) > -1) {
        source[i] = source[i].toUpperCase();
      }
    }
  }
  var code32 = source.join('');
  var code1 = code32.slice(0,1);
  if (isNaN(code1)) {
    var code16 = code32.slice(0,16);
  } else {
    var code16 = 'H' + code32.slice(1,16);
  }

  return code16;
}
