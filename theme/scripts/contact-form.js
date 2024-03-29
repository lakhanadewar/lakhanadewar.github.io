(function ($, window, document, undefined) {
  "use strict";
  $(document).ready(function () {
    $(".form-ajax").each(function (index) {
      var form = this;
      var sendToEmail = $(this).attr("data-email");
      var engine = $(this).attr("data-engine");
      if (isEmpty(engine)) engine = "php";
      if (isEmpty(sendToEmail)) sendToEmail = "";
      var subject = $(this).attr("data-subject");
      if (isEmpty(subject)) subject = "";
      $(form).submit(function (e) {
        $(".form-group").removeClass("has-error");
        $(".help-block").remove();
        if (
          typeof grecaptcha !== "undefined" &&
          $(this).find(".g-recaptcha").length
        ) {
          if (grecaptcha.getResponse().length === 0) {
            e.preventDefault;
            return false;
          }
        }
        $(form).find(".cf-loader").show();
        var formData = {
          values: {},
          domain: window.location.hostname.replace("www.", ""),
          email: sendToEmail,
          subject_email: subject,
          engine: engine,
        };
        $(form)
          .find("input,textarea,select")
          .each(function () {
            var val = $(this).val();
            if (!isEmpty(val)) {
              var name = $(this).attr("data-name");
              if (isEmpty(name)) name = $(this).attr("name");
              if (isEmpty(name)) name = $(this).attr("id");
              var error_msg = $(this).attr("data-error");
              if (isEmpty(error_msg)) error_msg = "";
              formData["values"][name] = [val, error_msg];
            }
          });
        $.ajax({
          type: "POST",
          url: $(form).attr("action"),
          data: formData,
          dataType: "json",
          encode: true,
        })
          .done(function (data) {
            if (!data.success) {
              console.log(data);
              $(form).find(".error-box").show();
            } else {
              $(form).html($(form).find(".success-box").html());
            }
            $(form).find(".cf-loader").hide();
          })
          .fail(function (data) {
            console.log(data);
            $(form).find(".error-box").show();
            $(form).find(".cf-loader").hide();
          });
        e.preventDefault();
      });
    });
  });
})(jQuery, window, document);
