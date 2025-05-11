/*!
 * website.js
 * Version - 1.2.1.0
 * Copyright (c) 2023 Deepak Vishnubhotla
 */
"use strict";

$(document).on("click", ".password", function () {
    if ($(this).hasClass("bi-eye-slash-fill")) {
        $(this).removeClass("bi-eye-slash-fill").addClass("bi-eye-fill");
        $(this).next().attr("type", "text");
    } else {
        $(this).removeClass("bi-eye-fill").addClass("bi-eye-slash-fill");
        $(this).next().attr("type", "password");
    }
    $(this).next().focus();
});

$("body").on("scroll", function () {
    if ($("body").scrollTop() >= 100) {
        $(".scroll-top").fadeIn();
    } else {
        $(".scroll-top").fadeOut();
    }
});

$("body").on("click", ".scroll-top", function () {
    $("html, body").animate({ scrollTop: 0 }, 100);
    return false;
});

$(document).on("focus", ":input", function () {
    $(this).attr("autocomplete", "off");
});

$(document).on("keypress", '[type="text"], [type="password"], select', function (e) {
    if (['Enter', 'NumpadEnter'].includes(e.key)) {
        e.preventDefault();
        return false;
    }
});

//$(document).on("click", function () {
//    $(".navbar-collapse").collapse("hide");
//});

$(document).on("show.bs.modal", function () {
    $("body").css("padding-right", "0");
});

$(document).on("shown.bs.modal", function () {
    $(".bs-modal").find("[type=text], [type=password], select").filter(":visible:first").focus();
});

function clearInputs(e) {
    e.find(":input").each(function () {
        switch ($(this).type) {
            case "file":
            case "password":
            case "text":
            case "textarea":
                $(this).val("");
                break;
            case "checkbox":
            case "radio":
                $(this).checked = false;
                break;
            default: break;
        }
    });
}

function disableDeveloperOptions() {
    document.addEventListener("contextmenu", function (e) {
        alert("Oops! Context menu disabled.");
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function (e) {
        if ((e.key === "F12") ||
            ((e.metaKey || e.ctrlKey) && e.key === "F12") ||
            ((e.metaKey || e.ctrlKey) && ["U", "u"].includes(e.key)) ||
            ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "I") ||
            ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "J")) {
            var _key = (e.altKey ? "ALT+" : "") + (e.ctrlKey ? "CTRL+" : "") + (e.shiftKey ? "SHIFT+" : "");
            alert(`Oops! Inspect (${_key}${e.key}) disabled.`);
            e.stopPropagation();
            e.preventDefault();
        }
    }, false);
    document.addEventListener("keydown", function (e) {
        if ((e.key === "F5") ||
            ((e.metaKey || e.ctrlKey) && e.key === "F5") ||
            ((e.metaKey || e.ctrlKey) && ["R", "r"].includes(e.key)) ||
            ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "R")) {
            var _key = (e.altKey ? "ALT+" : "") + (e.ctrlKey ? "CTRL+" : "") + (e.shiftKey ? "SHIFT+" : "");
            alert(`Oops! Refresh (${_key}${e.key}) disabled.`);
            e.stopPropagation();
            e.preventDefault();
        }
    }, false);
}

function getBool(e) {
    switch (e.toString().toLowerCase().trim()) {
        case "1":
        case "t":
        case "true":
        case "y":
        case "yes": return true;
        default: return false;
    }
}

function getParam(name) {
    const res = new RegExp("[\?&]" + name + "=([^&#]*)").exec(window.location.href);
    return res !== null ? decodeURI(res[1] || 0) : null;
}

function getPaths() {
    return window.location.pathname.split("/");
}

$.validator.addMethod("_alpha", function (val, e) {
    return this.optional(e) || /^[a-z ]+$/i.test(val);
}, $.validator.format("Please enter alphabets only."));

$.validator.addMethod("_email", function (val, e) {
    return this.optional(e) || /^(([\w-]+\.)+[\w-]+|([a-zA-Z]{1}|[\w-]{2,}))@((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|([a-zA-Z0-9]+[\w-]+\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,23})$/.test(val);
}, $.validator.format("Please enter valid email address."));

$.validator.addMethod("_password", function (val, e) {
    return this.optional(e) || /^(?=.*[!@#$&*()])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,16}$/.test(val);
}, $.validator.format("Please enter password in correct format."));

$.validator.addMethod("_phone", function (val, e) {
    return this.optional(e) || /^[6-9]\d{9}$/.test(val);
}, $.validator.format("Please enter valid phone number."));

$.validator.addMethod("_len", function (val, e, n) {
    return this.optional(e) || val.length === n;
}, $.validator.format("Please enter exactly {0} characters."));

$.validator.addMethod("_lt", function (val, e, n) {
    return this.optional(e) || parseInt(val) <= parseInt($(n).val());
}, $.validator.format("Please enter value less than {0}."));

$.validator.addMethod("_time", function (val, e) {
    return this.optional(e) || /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(val);
}, $.validator.format("Please enter valid time (24-hour)."));

const _pageName = "#partial-page";
const _location = window.location.pathname;

function getData(_url, _cb) {
    $.ajax({
        type: "GET",
        url: _url
    }).done(function (res) {
        return _cb(res);
    }).fail(function (err) {
        console.log(`Error: ${err.status} - ${err.responseText}`);
    });
}

function postData(_url, _cb) {
    const token = $('[name="__RequestVerificationToken"]').val();
    $.ajax({
        type: "POST",
        url: _url,
        data: {},
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN", token);
        }
    }).done(function (res) {
        return _cb(res);
    }).fail(function (err) {
        console.log(`Error: ${err.status} - ${err.responseText}`);
    });
}

function postForm(_form, _cb) {
    if (_form.valid()) {
        const token = $('[name="__RequestVerificationToken"]').val();
        $.ajax({
            type: "POST",
            url: _form.attr("action"),
            data: _form.serialize(),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", token);
            }
        }).done(function (res) {
            return _cb(res);
        }).fail(function (err) {
            console.log(`Error: ${err.status} - ${err.responseText}`);
        });
    }
}

$(document).on("click", ".manager-grid", function () {
    getData(_location + "/Grid", function (d) {
        $(_pageName).empty().html(d);
    });
});

$(document).on("click", ".manager-view", function () {
    const _id = $(this).attr("data-id");
    getData(_location + "/View?id=" + _id, function (d) {
        $(_pageName).empty().html(d);
    });
});

$(document).on("click", ".manager-edit", function () {
    const _id = $(this).attr("data-id");
    getData(_location + "/Edit?id=" + _id, function (d) {
        $(_pageName).empty().html(d);
    });
});

$(document).on("click", ".manager-dele", function () {
    if (confirm("Are you sure to delete?")) {
        const _id = $(this).attr("data-id");
        postData(_location + "/Delete?id=" + _id, function (d) {
            $(_pageName).empty().html(d);
        });
    }
});

//function fileUpload(_url, _files, _cb) {
//    if (_files.length === 1) {
//        const _data = new FormData();
//        _data.append("file", _files[0]);
//        const token = $('[name="__RequestVerificationToken"]').val();
//        $.ajax({
//            type: "POST",
//            url: _url,
//            beforesend: function (xhr) {
//                xhr.setrequestheader("XSRF-TOKEN", token);
//            },
//            cache: false,
//            contentType: false,
//            processData: false,
//            data: _data
//        }).done(function (res) {
//            return _cb(res);
//        }).fail(function (err) {
//            console.log(err);
//            return _cb(null);
//        });
//    }
//}

//var parent_id;
//$(document).on("click", ".upload-file", function () {
//    parent_id = $(this).prev().attr("id");
//    $(".manager-file").trigger("click");
//});

//$(document).on("change", ".manager-data", function () {
//    const _files = $(".manager-data")[0].files;
//    fileUpload(_page_path + "/Import", _files, function (d) {
//        $(_page_name).empty().html(d);
//        $(".manager-data").val("");
//    });
//});

//$(document).on("change", ".manager-file", function () {
//    const _files = $(".manager-file")[0].files;
//    fileUpload(_page_path + "/Upload", _files, function (d) {
//        $('#' + parent_id).val(d);
//        $('#' + parent_id).trigger("change");
//        $(".manager-file").val("");
//        parent_id = "";
//    });
//});

//$(document).on("change", ".manager-imag", () => {
//    $(".user-dp").attr("src", $(".manager-imag").val());
//});

$(function () {
    //$("#navbar-menu").on("hide.bs.collapse", function () {
    //    $(".navbar-toggle").removeClass("open");
    //});
    //$("#navbar-menu").on("show.bs.collapse", function () {
    //    $(".navbar-toggle").addClass("open");
    //});
    $("form").find('[type="text"], [type="password"], select').filter(":visible:first").focus();
    $('[readonly="readonly"]').attr("tabindex", -1);
    //disableDeveloperOptions();
});
