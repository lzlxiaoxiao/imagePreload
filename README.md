# ͼƬԤ����
���ǰԤ����ͼƬ��ʹ��jquery��װ���������������ʵ��չʾ��

- ͼƬ����Ԥ���أ���ҳչʾ��loading��ʾ�ٷֱȽ���
- qq��������Ԥ���أ���չʾ����ʾloading
- ��������Ԥ���أ���ҳչʾ

### ��ʼ������
``` bash
function PreLoad(imgs, options) {
  this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
  this.opts = $.extend({}, PreLoad.DEFAULTS, options); //�ϲ�defaultֵ�Ͳ���

  if [[ this.opts.order === "ordered" ]]; then
    this._ordered();  //����Ԥ����
  fi else
    this._unordered();   //����Ԥ����
}
PreLoad.DEFAULTS = {
  order: 'unordered', //����Ԥ����
  each: null, //ÿ��ͼƬ������Ϻ�ִ��
  all: null //����ͼƬ�������ִ��
};
```

### ����Ԥ���ش���
``` bash
PreLoad.prototype._unordered = function(){
  var imgs = this.imgs,
      opts = this.opts,
      count = 0,
      len = imgs.length;
  $.each(imgs, function(i, src) {
    if [[ typeof src != 'string' ]]; then
      return;
    fi
    var imgObj = new Image();
    $(imgObj).on('load error', function(e) {
      opts.each && opts.each(count);
      if [[ count >= len - 1 ]]; then
        opts.all && opts.all();
      fi
      count++;
    })
    imgObj.src = src;
  });
};
```

### ����Ԥ���ش���
``` bash
PreLoad.prototype._ordered = function() {
  var opts = this.opts,
      imgs = this.imgs,
      len = imgs.length,
      count = 0;

      load();

      function load() {
        var imgObj = new Image();
        $(imgObj).on('load error', function(e) {
            opts.each && opts.each(count);
            if [[ count >= len ]]; then
              //����ͼƬ�Ѿ��������
              opts.all && opts.all();
            fi else
            load();
            count++;
        });
        imgObj.src = imgs[count];
      }
}
```

### ��չ����
``` bash
$.extend({
  preload: function(imgs, opts) {
    new PreLoad(imgs, opts);
  }
});
```

### ����
``` bash
$.preload(imgs,{
  order: '',
  each: function(count) {

  },
  all: function() {

  }
})
});
```
