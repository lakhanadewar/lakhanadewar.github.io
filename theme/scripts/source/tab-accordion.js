/*
 * ===========================================================
 * TABS AND ACCORDION - THEMEKIT
 * ===========================================================
 * This script manage the tabs, collpse and accordion container components.
 *
 * Copyright (c) Federico Schiocchet - schiocco.com - Themekit
 */

"use strict";
(function ($) {
  var body;
  $(document).ready(function () {
    body = $("body");
    $(body).on("click", ".tab-box > ul li", function (e) {
      var tab = $(this).closest(".tab-box");
      var anima = $(tab).attr("data-tab-anima");
      var panel = $(tab).find(
        "> .panel:eq(" +
          $(this).index() +
          "), > .panel-box .panel:eq(" +
          $(this).index() +
          ")",
      );
      $(tab).find("> .panel, > .panel-box .panel").removeClass("active");
      $(tab).find("> ul li").removeClass("active");
      $(this).addClass("active");

      $(panel).addClass("active");
      if (!isEmpty(anima)) {
        $(panel).css("opacity", 0);
        $(panel).showAnima(anima);
      }
      setTimeout(function () {
        if ($.isFunction($.fn.initIsotope)) {
          $(panel)
            .find(".maso-list")
            .each(function () {
              $(this).initIsotope();
            });
        }
        if ($.isFunction($.fn.googleMap)) {
          $(panel)
            .find(".google-map")
            .each(function () {
              $(this).googleMap();
            });
        }
        if ($.isFunction($.fn.renderLoadedImgs)) {
          $(panel).find(".img-box").renderLoadedImgs();
        }
        if ($.isFunction($.fn.initSlider)) {
          $(panel)
            .find(".slider")
            .each(function () {
              $(this).initSlider();
            });
        }
        if ($.isFunction($.fn.progressCounter)) {
          $(panel)
            .find("[data-to]")
            .each(function () {
              $(this).progressCounter();
            });
        }
        if ($.isFunction($.fn.progressBar)) {
          $(panel)
            .find(".progress-bar [data-progress]")
            .each(function () {
              $(this).progressBar();
            });
        }
        if ($.isFunction($.fn.progressCircle)) {
          $(panel)
            .find(".progress-circle")
            .each(function () {
              $(this).progressCircle();
            });
        }
      }, 100);
      if ($(this).closest(".mega-menu").length) return false;
      e.preventDefault();
    });
    $(body).on("click", "header .mega-tabs", function () {
      $(this).find(".nav-tabs li:first-child").addClass("active");
    });
    $(body)
      .find(".tab-box.left,.tab-box.right")
      .each(function () {
        $(this).initTab();
      });
    $("[data-height].collapse-box").each(function () {
      $(this)
        .find(" > .content")
        .css("height", $(this).attr("data-height") + "px")
        .show();
    });
    $(".accordion-list[data-open]").each(function () {
      $(this).initAccordion();
    });
    $(body).on("click", ".collapse-box > .collapse-button > a", function () {
      var t = this;
      var collapse = $(this).closest(".collapse-box");
      var open_text = $(t).attr("data-button-open-text");
      if ($(collapse).hasClass("open")) {
        closeCollapse(collapse);
      } else {
        openCollapse(collapse);
        if (!isEmpty(open_text)) {
          $(this).attr("data-button-close-text", $(this).html());
          setTimeout(function () {
            $(t).html(open_text);
          }, 500);
        }
      }
    });
    $(body).on("click", ".accordion-list > li > a", function () {
      var list = $(this).closest(".accordion-list");
      var item = $(this).parent();
      var type = $(list).attr("data-type");
      var time = $(list).attr("data-time");
      var content = $(item).find(" > .content");

      if (isEmpty(type)) type = "";
      if (isEmpty(time)) time = 500;
      else time = parseInt(time);

      $(list)
        .find(" > .content")
        .each(function () {
          $(this).clearQueue();
        });
      if ($(item).hasClass("active")) {
        $(item).removeClass("active");
        $(content).animate(
          {
            height: 0,
          },
          time,
          function () {
            $(content).css("display", "none").css("height", "");
          },
        );
      } else {
        if (type != "multiple") {
          $(list)
            .find(" > .active > .content")
            .animate(
              {
                height: 0,
              },
              time,
              function () {
                $(this).css("display", "none").css("height", "");
              },
            );
          $(list).find(" > .active").removeClass("active");
        }
        $(item).addClass("active");
        $(content).css({
          display: "block",
          height: "auto",
          opacity: "0",
        });
        var height = $(content).height();
        $(content).css({
          height: "",
          opacity: "",
        });
        $(content).animate(
          {
            height: height,
          },
          time,
        );
      }
    });
  });
  function closeCollapse(target) {
    var content = $(target).find(".content");
    var height = $(target).attr("data-height");
    var time = $(target).attr("data-time");
    var button = $(target).find(".collapse-button > a");
    var close_text = $(button).attr("data-button-close-text");
    if (isEmpty(time)) time = 500;

    $(content).animate(
      {
        height: isEmpty(height) ? 0 : height,
      },
      parseInt(time, 10),
      function () {
        if (isEmpty(height)) {
          $(content).css("display", "none");
          $(content).css("height", "");
        }
        if (!isEmpty(close_text)) {
          $(button).html(close_text);
        }
      },
    );

    $(target).removeClass("open");
  }
  function openCollapse(target) {
    var content = $(target).find(".content");
    var height = $(target).attr("data-height");
    var time = $(target).attr("data-time");
    var button = $(target).find(".collapse-button > a");
    var open_text = $(button).attr("data-button-open-text");
    var final_height;

    $(content).css("display", "block").css("height", "");
    final_height = $(content).height();
    $(content).css("height", 0);

    if (isEmpty(time)) time = 500;
    if (!isEmpty(height)) {
      $(content).css("height", height + "px");
    }
    $(content).animate(
      {
        height: final_height,
      },
      parseInt(time, 10),
      function () {
        if (!isEmpty(open_text)) {
          $(button).html(open_text);
        }
      },
    );

    $(target).addClass("open");
  }
  $.fn.initTab = function () {
    var t = $(this).find(".nav-tabs");
    var p = $(this).find(".panel-box");
    if ($(p).outerHeight() < $(t).outerHeight())
      $(p)
        .find(".panel")
        .css("height", $(t).outerHeight() + "px");
    else $(t).css("height", $(p).find(".panel").outerHeight() + "px");
  };
  $.fn.initAccordion = function () {
    var index = $(this).attr("data-open");
    var t = this;
    setTimeout(function () {
      $(t)
        .find(" > li")
        .eq(parseInt(index, 10) - 1)
        .find(" > a")
        .click();
    }, 300);
  };
})(jQuery);
