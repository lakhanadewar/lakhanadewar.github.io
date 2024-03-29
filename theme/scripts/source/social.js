/*
 * Tweetie: A simple Twitter feed plugin
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */
(function ($) {
  "use strict";
  function isEmpty(obj) {
    if (
      typeof obj !== "undefined" &&
      obj !== null &&
      (obj.length > 0 ||
        typeof obj == "number" ||
        typeof obj.length == "undefined") &&
      obj !== "undefined"
    )
      return false;
    else return true;
  }
  $.fn.twittie = function () {
    var e = arguments[0] instanceof Object ? arguments[0] : {},
      t = "function" == typeof arguments[0] ? arguments[0] : arguments[1],
      a = "";
    var p = $("script[src*='social.min.js']").attr("src");
    if (!isEmpty(p) && p.indexOf("social.min.js") > -1)
      (a = p.substr(0, p.lastIndexOf("/"))), !1;
    var r = $.extend(
      {
        username: null,
        list: null,
        hashtag: null,
        count: 10,
        hideReplies: !1,
        dateFormat: "%b/%d/%Y",
        template:
          '<div class="tweet-cnt"><a href="{{url}}" target="_blank">{{avatar}}</a><div class="tweets_txt">{{tweet}}<span>{{date}}</span></div></div>',
        apiPath: a + "/tweetie/api/tweet.php",
        loadingText: '<div class="feeds-loading"></div>',
      },
      e,
    );
    r.list &&
      !r.username &&
      $.error(
        "If you want to fetch tweets from a list, you must define the username of the list owner.",
      );
    var n = function (e) {
        return e
          .replace(
            /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi,
            '<a href="$1" target="_blank" title="Visit this link">$1</a>',
          )
          .replace(
            /#([a-zA-Z0-9_]+)/g,
            '<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>',
          )
          .replace(
            /@([a-zA-Z0-9_]+)/g,
            '<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>',
          );
      },
      s = function (e) {
        for (
          var t = e.split(" "),
            a = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            n = {
              "%d": (e = new Date(
                Date.parse(
                  t[1] + " " + t[2] + ", " + t[5] + " " + t[3] + " UTC",
                ),
              )).getDate(),
              "%m": e.getMonth() + 1,
              "%b": a[e.getMonth()].substr(0, 3),
              "%B": a[e.getMonth()],
              "%y": String(e.getFullYear()).slice(-2),
              "%Y": e.getFullYear(),
            },
            s = r.dateFormat,
            i = r.dateFormat.match(/%[dmbByY]/g),
            l = 0,
            u = i.length;
          l < u;
          l++
        )
          s = s.replace(i[l], n[i[l]]);
        return s;
      },
      i = function (e) {
        for (
          var t = r.template,
            a = [
              "date",
              "tweet",
              "avatar",
              "url",
              "retweeted",
              "screen_name",
              "user_name",
            ],
            n = 0,
            s = a.length;
          n < s;
          n++
        )
          t = t.replace(new RegExp("{{" + a[n] + "}}", "gi"), e[a[n]]);
        return t;
      };
    this.html("<span>" + r.loadingText + "</span>");
    var l = this;
    $.getJSON(
      r.apiPath,
      {
        username: r.username,
        list: r.list,
        hashtag: r.hashtag,
        count: r.count,
        exclude_replies: r.hideReplies,
      },
      function (e) {
        l.find("span").fadeOut("fast", function () {
          l.html("<ul></ul>");
          for (var a = 0; a < r.count; a++) {
            var u = !1;
            if (e[a]) u = e[a];
            else {
              if (void 0 === e.statuses || !e.statuses[a]) break;
              u = e.statuses[a];
            }
            var c = u.retweeted ? u.retweeted_status.text : u.text;
            null != r.length &&
              c.length > r.length &&
              (c = c.substr(0, parseInt(r.length)) + "..."),
              (c = n(u.retweeted ? "RT @" + u.user.screen_name + ": " + c : c));
            var h = {
              user_name: u.user.name,
              date: s(u.created_at),
              tweet: c,
              avatar: '<img src="' + u.user.profile_image_url + '" />',
              url:
                "https://twitter.com/" +
                u.user.screen_name +
                "/status/" +
                u.id_str,
              retweeted: u.retweeted,
              screen_name: n("@" + u.user.screen_name),
            };
            l.find("ul").append("<li>" + i(h) + "</li>");
          }
          "function" == typeof t && t();
        });
      },
    );
  };
})(jQuery);

/*
 * Facebook Wall
 * https://github.com/thomasclausen/jquery-facebook-wall
 * Under MIT License
 */
!(function (e) {
  e.fn.facebook_wall = function (s) {
    function a(e) {
      return (
        (s = e.replace(/</g, "&lt;").replace(/>/g, "&gt;")),
        s
          .replace(
            /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,
            '<a href="$1" target="_blank">$1</a>',
          )
          .replace(/(\r\n)|(\n\r)|\r|\n/g, "<br />")
      );
      var s;
    }

    function t(e) {
      var a = new Date(1e3 * e),
        t = (a.toGMTString(), Math.round(new Date().getTime() / 1e3) - e);
      return t < 10
        ? s.text_labels.seconds.few
        : t < 60
        ? Math.round(t) + s.text_labels.seconds.plural
        : 1 === Math.round(t / 60)
        ? Math.round(t / 60) + s.text_labels.minutes.singular
        : Math.round(t / 60) < 60
        ? Math.round(t / 60) + s.text_labels.minutes.plural
        : 1 === Math.round(t / 3600)
        ? Math.round(t / 3600) + s.text_labels.hours.singular
        : Math.round(t / 3600) < 24
        ? Math.round(t / 3600) + s.text_labels.hours.plural
        : 1 === Math.round(t / 86400)
        ? Math.round(t / 86400) + s.text_labels.days.singular
        : Math.round(t / 86400) <= 10
        ? Math.round(t / 86400) + s.text_labels.days.plural
        : s.text_labels.weekdays[a.getDay()] +
          " " +
          a.getDate() +
          ". " +
          s.text_labels.months[a.getMonth()] +
          " " +
          a.getFullYear();
    }
    if (void 0 !== s.id && void 0 !== s.access_token) {
      var i = "https://graph.facebook.com/",
        l = (s = e.extend(
          {
            id: "",
            access_token: "",
            limit: 15,
            timeout: 400,
            speed: 400,
            effect: "slide",
            locale: "en_US",
            avatar_size: "square",
            message_length: 200,
            comments: !0,
            show_guest_entries: !0,
            text_labels: {
              shares: {
                singular: "Shared % time",
                plural: "Shared % times",
              },
              likes: {
                singular: "% Like",
                plural: "% Likes",
              },
              comments: {
                singular: "% comment",
                plural: "% comments",
              },
              like: "Like",
              comment: "Write comment",
              share: "Share",
              weekdays: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              months: [
                "januari",
                "february",
                "march",
                "april",
                "may",
                "june",
                "july",
                "august",
                "september",
                "october",
                "november",
                "december",
              ],
              seconds: {
                few: "second ago",
                plural: " seconds ago",
              },
              minutes: {
                singular: " minut ago",
                plural: " minutes ago",
              },
              hours: {
                singular: " hour ago",
                plural: " hours ago",
              },
              days: {
                singular: " day ago",
                plural: " days ago",
              },
            },
            on_complete: null,
          },
          s,
        )).comments
          ? "comments,"
          : "",
        n =
          i +
          "v2.9/" +
          s.id +
          "/?access_token=" +
          s.access_token +
          "&locale=" +
          s.locale +
          "&date_format=U&fields=posts.limit(" +
          s.limit +
          "){caption,message,picture,from,link,source,properties,icon,actions,is_hidden,is_expired,likes," +
          l +
          "shares,status_type,object_id,created_time,updated_time,type}",
        o = e(this);
      o.append('<div class="feeds-loading facebook-loading"></div>'),
        e
          .getJSON(n, function (l) {
            e.each(l.posts.data, function () {
              var e = "",
                l = "",
                n = "";
              if (!1 === this.is_hidden) {
                if (
                  ("link" === this.type
                    ? (l = "type-link ")
                    : "photo" === this.type
                    ? (l = "type-photo ")
                    : "status" === this.type
                    ? (l = "type-status ")
                    : "video" === this.type && (l = "type-video "),
                  (e +=
                    '<li class="post ' +
                    l +
                    "avatar-size-" +
                    s.avatar_size +
                    '">'),
                  (e += '<div class="meta-header">'),
                  (e +=
                    '<div class="avatar"><a href="http://www.facebook.com/profile.php?id=' +
                    this.from.id +
                    '" target="_blank" title="' +
                    this.from.name +
                    '"><img src="' +
                    (i + this.from.id) +
                    "/picture?type=" +
                    s.avatar_size +
                    '" alt="' +
                    this.from.name +
                    '" /></a></div>'),
                  (e +=
                    '<div class="author"><a href="http://www.facebook.com/profile.php?id=' +
                    this.from.id +
                    '" target="_blank" title="' +
                    this.from.name +
                    '">' +
                    this.from.name +
                    "</a></div>"),
                  (e += '<div class="date">' + t(this.created_time) + "</div>"),
                  (e += "</div>"),
                  void 0 !== this.message
                    ? s.message_length > 0 &&
                      this.message.length > s.message_length
                      ? (e +=
                          '<div class="message">' +
                          a(this.message.substring(0, s.message_length)) +
                          "...</div>")
                      : (e +=
                          '<div class="message">' + a(this.message) + "</div>")
                    : void 0 !== this.story &&
                      (s.message_length > 0 &&
                      this.story.length > s.message_length
                        ? (e +=
                            '<div class="story">' +
                            a(this.story.substring(0, s.message_length)) +
                            "...</div>")
                        : (e +=
                            '<div class="story">' + a(this.story) + "</div>")),
                  ("link" !== this.type &&
                    "photo" !== this.type &&
                    "video" !== this.type) ||
                    ((e += '<div class="media' + ' clearfix">'),
                    void 0 !== this.picture
                      ? (e +=
                          '<div class="image"><a href="' +
                          this.link +
                          '" target="_blank"><img src="' +
                          this.picture +
                          '" /></a></div>')
                      : void 0 !== this.object_id &&
                        (e +=
                          '<div class="image"><a href="' +
                          this.link +
                          '" target="_blank"><img src="' +
                          (i + this.object_id) +
                          '/picture?type=album" /></a></div>'),
                    (e += '<div class="media-meta">'),
                    void 0 !== this.name &&
                      (e +=
                        '<div class="name"><a href="' +
                        this.link +
                        '" target="_blank">' +
                        this.name +
                        "</a></div>"),
                    void 0 !== this.caption &&
                      (e +=
                        '<div class="caption">' + a(this.caption) + "</div>"),
                    void 0 !== this.description &&
                      (e +=
                        '<div class="description">' +
                        a(this.description) +
                        "</div>"),
                    (e += "</div>"),
                    (e += "</div>")),
                  (e += '<div class="meta-footer">'),
                  (e +=
                    '<time class="date" datetime="' +
                    this.created_time +
                    '" pubdate>' +
                    t(this.created_time) +
                    "</time>"),
                  void 0 !== this.likes &&
                    void 0 !== this.likes.data &&
                    (void 0 !== this.likes.count
                      ? 1 === this.likes.count
                        ? (e +=
                            '<span class="seperator">&middot;</span><span class="likes">' +
                            s.text_labels.likes.singular.replace(
                              "%",
                              this.likes.count,
                            ) +
                            "</span>")
                        : (e +=
                            '<span class="seperator">&middot;</span><span class="likes">' +
                            s.text_labels.likes.plural.replace(
                              "%",
                              this.likes.count,
                            ) +
                            "</span>")
                      : 1 === this.likes.data.length
                      ? (e +=
                          '<span class="seperator">&middot;</span><span class="likes">' +
                          s.text_labels.likes.singular.replace(
                            "%",
                            this.likes.data.length,
                          ) +
                          "</span>")
                      : (e +=
                          '<span class="seperator">&middot;</span><span class="likes">' +
                          s.text_labels.likes.plural.replace(
                            "%",
                            this.likes.data.length,
                          ) +
                          "</span>")),
                  void 0 !== this.comments &&
                    void 0 !== this.comments.data &&
                    (1 === this.comments.data.length
                      ? (e +=
                          '<span class="seperator">&middot;</span><span class="comments">' +
                          s.text_labels.comments.singular.replace(
                            "%",
                            this.comments.data.length,
                          ) +
                          "</span>")
                      : (e +=
                          '<span class="seperator">&middot;</span><span class="comments">' +
                          s.text_labels.comments.plural.replace(
                            "%",
                            this.comments.data.length,
                          ) +
                          "</span>")),
                  void 0 !== this.shares
                    ? 1 === this.shares.count
                      ? (e +=
                          '<span class="seperator">&middot;</span><span class="shares">' +
                          s.text_labels.shares.singular.replace(
                            "%",
                            this.shares.count,
                          ) +
                          "</span>")
                      : (e +=
                          '<span class="seperator">&middot;</span><span class="shares">' +
                          s.text_labels.shares.plural.replace(
                            "%",
                            this.shares.count,
                          ) +
                          "</span>")
                    : (e +=
                        '<span class="seperator">&middot;</span><span class="shares">' +
                        s.text_labels.shares.plural.replace("%", "0") +
                        "</span>"),
                  (e +=
                    '<div class="actionlinks"><span class="like"><a href="http://www.facebook.com/permalink.php?story_fbid=' +
                    (n = this.id.split("_"))[1] +
                    "&id=" +
                    n[0] +
                    '" target="_blank">' +
                    s.text_labels.like +
                    '</a></span><span class="seperator">&middot;</span><span class="comment"><a href="http://www.facebook.com/permalink.php?story_fbid=' +
                    n[1] +
                    "&id=" +
                    n[0] +
                    '" target="_blank">' +
                    s.text_labels.comment +
                    '</a></span><span class="seperator">&middot;</span><span class="share"><a href="http://www.facebook.com/permalink.php?story_fbid=' +
                    n[1] +
                    "&id=" +
                    n[0] +
                    '" target="_blank">' +
                    s.text_labels.share +
                    "</a></span></div>"),
                  (e += "</div>"),
                  void 0 !== this.likes && void 0 !== this.likes.data)
                ) {
                  e += '<ul class="like-list">';
                  for (var r = 0; r < this.likes.data.length; r++)
                    (e += '<li class="like">'),
                      (e += '<div class="meta-header">'),
                      (e +=
                        '<div class="avatar"><a href="http://www.facebook.com/profile.php?id=' +
                        this.likes.data[r].id +
                        '" target="_blank" title="' +
                        this.likes.data[r].name +
                        '"><img src="' +
                        (i + this.likes.data[r].id) +
                        "/picture?type=" +
                        s.avatar_size +
                        '" alt="' +
                        this.likes.data[r].name +
                        '" /></a></div>'),
                      (e +=
                        '<div class="author"><a href="http://www.facebook.com/profile.php?id=' +
                        this.likes.data[r].id +
                        '" target="_blank" title="' +
                        this.likes.data[r].name +
                        '">' +
                        this.likes.data[r].name +
                        "</a>" +
                        s.text_labels.likes.singular.replace("%", "") +
                        "</div>"),
                      (e += "</div>"),
                      (e += "</li>");
                  e += "</ul>";
                }
                if (void 0 !== this.comments && void 0 !== this.comments.data) {
                  e += '<ul class="comment-list">';
                  for (var d = 0; d < this.comments.data.length; d++)
                    (e += '<li class="comment">'),
                      (e +=
                        '<div class="message">' +
                        a(this.comments.data[d].message) +
                        "</div>"),
                      (e +=
                        '<time class="date" datetime="' +
                        this.comments.data[d].created_time +
                        '" pubdate>' +
                        t(this.comments.data[d].created_time) +
                        "</time>"),
                      (e += "</li>");
                  e += "</ul>";
                }
                (e += "</li>"), o.append(e);
              }
            });
          })
          .done(function () {
            e(".facebook-loading", o).fadeOut(800, function () {
              e(this).remove();
              for (var a = 0; a < o.children("li").length; a++)
                "none" === s.effect
                  ? o.children("li").eq(a).show()
                  : "fade" === s.effect
                  ? o
                      .children("li")
                      .eq(a)
                      .delay(a * s.timeout)
                      .fadeIn(s.speed)
                  : o
                      .children("li")
                      .eq(a)
                      .delay(a * s.timeout)
                      .slideDown(s.speed, function () {
                        e(this).css("overflow", "visible");
                      });
            }),
              e.isFunction(s.on_complete) && s.on_complete.call();
          });
    }
  };
})(jQuery);
/*
 * ===========================================================
 * SOCIAL STREAM - THEMEKIT
 * ===========================================================
 * Social stream of Facebook and Twitter, this script have 4 display types: simple list, scroll box container, slider and carousel
 * Documentation: www.framework-y.com/components/social.html
 *
 * Schiocco - Copyright (c) Federico Schiocchet - schiocco.com - Themekit
 */

var facebook_token = "";
(function ($) {
  $(document).ready(function () {
    $("[data-social-id].social-feed-fb").each(function () {
      $(this).social_feed_fb();
    });
    $("[data-social-id].social-feed-tw").each(function () {
      $(this).social_feed_tw();
    });
  });
  $.fn.social_feed_fb = function () {
    var feed = this;
    var count = 4;
    var optionsString = $(feed).attr("data-options");
    var id = $(feed).attr("data-social-id");
    var token = $(feed).attr("data-token");
    if (isEmpty(token)) token = facebook_token;
    var optionsArr;
    var options = {
      access_token: token,
      limit: count,
      locale: "en_US",
      show_guest_entries: false,
      on_complete: function () {
        $(feed).trigger("social-feed-completed");
      },
    };

    $(feed).find("li").remove();
    if (!isEmpty(optionsString)) {
      optionsArr = optionsString.split(",");
      options = getOptionsString(optionsString, options);
    }

    if (!isEmpty(id)) options["id"] = id;
    $(feed).facebook_wall(options);

    if ($(feed).hasClass("social-slider")) {
      let parent = $(feed).parent().parent();
      if ($(parent).hasClass("slider")) {
        $(parent).replaceWith(feed);
      }
      $(feed).css("opacity", "0");
      $(".social-feed-fb").on("social-feed-completed", function (event) {
        $(this).social_slider("social-feed-fb");
        $(this).css("opacity", "");
      });
    }
  };
  $.fn.social_feed_tw = function () {
    var feed = this;
    var optionsString = $(feed).attr("data-options");
    var id = $(feed).attr("data-social-id");
    var optionsArr;
    var options = {
      count: 10,
    };

    if (!isEmpty(optionsString)) {
      optionsArr = optionsString.split(",");
      options = getOptionsString(optionsString, options);
    }

    $(feed).find("ul li").remove();
    if (!isEmpty(id)) options["username"] = id;
    $(feed).twittie(options, function () {
      if ($(feed).hasClass("social-slider")) {
        let parent = $(feed).parent().parent();
        if ($(parent).hasClass("slider")) {
          $(parent).replaceWith(feed);
        }
        $(feed).css("opacity", "0");
        $(".social-feed-tw").on("social-feed-completed", function (event) {
          $(this).social_slider("social-feed-tw");
          $(this).css("opacity", "");
        });
      }
      $(feed).trigger("social-feed-completed");
    });
  };
  $.fn.social_slider = function (classes) {
    let id = "auto-" + Math.floor(Math.random() * 100);
    let slider;
    $(this).find(".facebook-loading").remove();
    if (typeof hc_front != "undefined") {
      classes += " hc-cmp-social-feeds hc-component";
    }
    $(this).renderSlider(
      id,
      "social-feed social-slider " + classes,
      ' id="' + $(this).attr("id") + '"',
    );
    slider = $("#" + id + " .glide__slides > ul");
    if ($(slider).length) {
      $(slider).parent().html($(slider).html());
    }
    if (isEmpty($(this).data("trigger"))) {
      $("#" + id).initSlider();
    }
  };
})(jQuery);
