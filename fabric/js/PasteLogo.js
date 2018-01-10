var Fabric = {
  Temp: {
    FabricWidth: null,
    FabricHeight: null,
    ScaleStep: 0.02,
    ScaleNow: 3,
    PreviewDataURL: null
  },
  Var: {
    init: function() {
      this.finBox = new fabric.Canvas("finBox");
      $canvas = this.finBox;
      $canvas.on({
        //點擊與移動時 物件半透明
        "mouse:down": function(e) {
          if (e.target) {
            e.target.opacity = 0.5;
            $canvas.renderAll();
          }
        },
        "mouse:up": function(e) {
          if (e.target) {
            e.target.opacity = 1;
            $canvas.renderAll();
          }
        },
        "object:moved": function(e) {
          e.target.opacity = 0.5;
        },
        "object:modified": function(e) {
          e.target.opacity = 1;
        },

        //限制移動邊界
        "object:moving": function(e) {
          var obj = e.target;
          // if object is too big ignore
          if (
            obj.currentHeight > obj.canvas.height ||
            obj.currentWidth > obj.canvas.width
          ) {
            return;
          }
          obj.setCoords();
          // top-left  corner
          if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(
              obj.left,
              obj.left - obj.getBoundingRect().left
            );
          }
          // bot-right corner
          if (
            obj.getBoundingRect().top + obj.getBoundingRect().height >
              obj.canvas.height ||
            obj.getBoundingRect().left + obj.getBoundingRect().width >
              obj.canvas.width
          ) {
            obj.top = Math.min(
              obj.top,
              obj.canvas.height -
                obj.getBoundingRect().height +
                obj.top -
                obj.getBoundingRect().top
            );
            obj.left = Math.min(
              obj.left,
              obj.canvas.width -
                obj.getBoundingRect().width +
                obj.left -
                obj.getBoundingRect().left
            );
          }
        }
      });
    }
  },
  Function: {
    SetBackground: function(target, str) {
      target.setHeight(300);
      target.setWidth(300);
      fabric.Image.fromURL(
        "https://wildaid.webgene.com.tw/asset/svg/fin-gn.svg",
        function(img) {
          var $canvas = target;
          var scaleWidth = $canvas.getWidth() / img.width;
          var scaleHeight = $canvas.getHeight() / img.height;
          img.set({
            scaleX: scaleWidth,
            scaleY: scaleHeight,
            originX: "left",
            originY: "top"
          });

          var text = new fabric.Text(str, {
            fontFamily: "Noto Sans TC",
            left: 0, //Take the block's position
            top: 0,
            //                  fill: '#363636',
            fill: "#231815",
            fontSize: $canvas.getWidth() / 14,
            fontWeight: "400",
            //不可選擇
            selectable: false,
            //不可選擇移動
            evented: false
          });
          text.set("top", ($canvas.getHeight() - text.height) * 1.01);
          text.set("left", $canvas.getWidth() / 2);
          //                text.set("left", (($canvas.getWidth() * 1.4) - text.width) / 2)
          if ($canvas.item(0)) $canvas.remove($canvas.item(0));
          $canvas.add(text);

          //若要當背景時
          $canvas.setBackgroundImage(img, $canvas.renderAll.bind($canvas));

          //若要當遮罩濾鏡時
          //$canvas.setOverlayImage(img, $canvas.renderAll.bind($canvas));

          $("div.s2-main div.finBox").hide(0, function() {
            $("div#divFabric").fadeIn("slow", function() {
              callback(true);
            });
          });
        }
      );
    },
    UploadImage: function(data, callback) {
      var $canvas = Fabric.Var.finBox;
      fabric.Image.fromURL(data, function(img) {
        var scaleWidth = $canvas.getWidth() / img.width;
        var scaleHeight = $canvas.getHeight() / img.height;
        var scale = Math.min(scaleWidth, scaleHeight) / 4;
        Fabric.Temp.ScaleStep = scale / 7;
        var left = $canvas.getWidth() / 4;
        var top = $canvas.getHeight() / 5;
        var oImg = img
          .set({
            // left: left,
            // top: top,
            left: 0,
            top: 0,
            angle: 0,
            hasControls: false,
            hasBorders: false
          })
          .scale(scale);
        if ($canvas.item(1)) $canvas.remove($canvas.item(1));

        $canvas.add(oImg).renderAll();
        callback();
      });
    }
  },
  Init: function(callback) {
    this.Var.init();
    setTimeout(function() {
      callback();
    }, 1000);
  }
};

//上傳 input
$("#upload").on("change", function(e) {
  if (this.files && this.files[0]) {
    var fileSize = this.files[0].size / 1024 / 1024;
    if (fileSize > 2) {
      alert("照片最大僅支持2MB");
    } else {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function(f) {
        var data = f.target.result;
        //先清除第一張圖
        $canvas = Fabric.Var.finBox;
        if ($canvas.item(1)) $canvas.remove($canvas.item(1));
        Fabric.Function.UploadImage(data, function() {
          $(".options").show();
        });
      };
      reader.readAsDataURL(file);
    }
  }
});

//加
$(".plus").on("click", function(e) {
  e.preventDefault();
  if (Fabric.Temp.ScaleNow == 6) return;
  var $canvas = Fabric.Var.finBox;
  var step = Fabric.Temp.ScaleStep;
  Fabric.Var.finBox.item(1).scaleX = Fabric.Var.finBox.item(1).scaleX + step;
  Fabric.Var.finBox.item(1).scaleY = Fabric.Var.finBox.item(1).scaleY + step;
  Fabric.Var.finBox.renderAll();

  // var circle = $(".scale .cir");
  var oldval = Fabric.Temp.ScaleNow;
  var newval = Fabric.Temp.ScaleNow + 1;
  Fabric.Temp.ScaleNow = newval;
  // circle.css("left", newval * 16.67 + "%");
  $(".slider").val(newval);
});
//減
$(".minus").on("click", function(e) {
  e.preventDefault();
  if (Fabric.Temp.ScaleNow == 0) return;

  var $canvas = Fabric.Var.finBox;
  var step = Fabric.Temp.ScaleStep;
  Fabric.Var.finBox.item(1).scaleX = Fabric.Var.finBox.item(1).scaleX - step;
  Fabric.Var.finBox.item(1).scaleY = Fabric.Var.finBox.item(1).scaleY - step;
  Fabric.Var.finBox.renderAll();

  // var circle = $('.scale .cir')
  var oldval = Fabric.Temp.ScaleNow;
  var newval = Fabric.Temp.ScaleNow - 1;
  Fabric.Temp.ScaleNow = newval;
  // circle.css('left', (newval * 16.67) + '%')
  $(".slider").val(newval);
});
//Range
$(".slider").on("change", function(e) {
  var oldval = Fabric.Temp.ScaleNow;
  var newval = $(this).val();

  var $canvas = Fabric.Var.finBox;
  var step = Fabric.Temp.ScaleStep;
  if (oldval < newval) {
    var x = newval - oldval;
    Fabric.Var.finBox.item(1).scaleX =
      Fabric.Var.finBox.item(1).scaleX + step * x;
    Fabric.Var.finBox.item(1).scaleY =
      Fabric.Var.finBox.item(1).scaleY + step * x;
  }
  if (oldval > newval) {
    var x = oldval - newval;
    Fabric.Var.finBox.item(1).scaleX =
      Fabric.Var.finBox.item(1).scaleX - step * x;
    Fabric.Var.finBox.item(1).scaleY =
      Fabric.Var.finBox.item(1).scaleY - step * x;
  }

  $canvas.renderAll();
  Fabric.Temp.ScaleNow = parseInt(newval);
});

$(function() {
  Fabric.Init(function() {
    Fabric.Function.SetBackground(Fabric.Var.finBox, "無翅聯盟");
  });
});
