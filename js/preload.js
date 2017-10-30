
// 图片预加载
// 采用闭包模拟局部作用域
(function ($) {
  function PreLoad(imgs, options) {
    // 初始化
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, PreLoad.DEFAULTS, options);

    if (this.opts.order === 'ordered') {
      // 有序方法调用
      this._ordered();
    } else {
      // 无序方法调用
      this._unordered();
    }
  }
  // 默认
  PreLoad.DEFAULTS = {
    order: 'unordered',
    each: null, // 每张图片加载完毕后执行
    all: null // 所有图片加载完毕后执行
  };

  // 有序预加载
  PreLoad.prototype._ordered = function () {
    var opts = this.opts,
        imgs = this.imgs,
        len = imgs.length,
        count = 0;
    load();
    function load() {
      var imgObj = new Image();
      $(imgObj).on('load error', function () {
        opts.each && opts.each(count);
        if (count >= len) {
          // 所有图片已加载完成
          opts.all && opts.all();
        } else {
          load(); // 完成下一步的加载
        }
        count++;
      });
      imgObj.src = imgs[count];
    }
  }

  // 无序方法（只在内部使用）
  PreLoad.prototype._unordered = function () {
    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len = imgs.length;
    $.each(imgs, function (i, src) {
      if (typeof src != 'string') return; // 如果src不是字符串，返回
      var imgObj = new Image();
      $(imgObj).on('load error', function () {
        opts.each && opts.each(count); // 如果存在则执行
        if (count >= len - 1) {
          opts.all && opts.all();
        }
        count++;
      });
      imgObj.src = src;
    });
  };

  //$.fn.extend -> $("#img").preload()
  //$.extend -> $.preload()

  $.extend({
    preload: function (imgs, opts) {
      new PreLoad(imgs, opts);
    }
  });

})(jQuery);