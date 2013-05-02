$(document).ready(function () {

    $("#chatbtn").click(function () {
        sendChat();
    });

    $("#userinput").keydown(function (evt) {
        if (evt.keyCode == 10 || evt.keyCode == 13) {
            sendChat();
        }
    });

    $("#userinput").focus();
});

function commas(num) {
    num = output = num.toString(), l = num.length;
    for (var i = l; i > -1; i = i - 3) {
        if (i != 0 && i != l) {
            output = output.substring(0, i) + ',' + output.substring(i)
        }
    }
    return output;
}


function sendChat() {
    var msg = $("#userinput").val();

    if (msg.trim().length == 0) {
        alert("Say something!");
        $("#userinput").val("");
        $("#userinput").focus();
        return;
    }

    $("#userinput").attr("disabled", "disabled");
    $("#userinput").val("");

    var delay = Math.floor((Math.random() * (1500 - 1000 + 1)));
    setTimeout(function () {
        delayChat(msg);
    }, delay);

    return false;
}

//talk send

function delayChat(inputMsg) {

    var msg = encodeURIComponent(inputMsg);
    var res = "";

    $.ajax({
        url: "./said",
        data: {
            msg: msg
        },
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: function (xhr, textStatus, errorThrown) {
            alert("error!");
            complete();
        },
        success: function (json) {
            try {
                if (json.result == "100") {
                    res = json.response;
                } else {
                    res = "I have no response.";
                }

                $(".templete").clone().removeClass("hidden").removeClass("templete")
                    .addClass("new-templete")
                    .appendTo("#msgs");

                $(".new-templete:last").find(".man").html("").append("<span>" + inputMsg.htmlEntities() + "</span>");

                $(".new-templete:last").find(".bot").html("").append("<span>"+ (res.htmlEntities())+"</span>");


                complete();
            } catch (e) {
                alert("error!");
                complete();
            }
        }
    });
}

function complete() {
    $("#loading").hide();
    $("#userinput").attr("disabled", "");
    $("#userinput").css({
        "background": "",
        "margin-top": "0px"
    });

    $('#userinput').focus();

    var divOffset = $("#msgs").offset().top;
    var pOffset = $(".new-templete:last").offset().top;
    var pScroll = pOffset - divOffset;

    $("#msgs").animate({
        scrollTop: '+=' + parseInt(pScroll) + 'px'
    }, 600);
}

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
};
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
};
String.prototype.unescapeHtml = function () {
    var temp = document.createElement("div");
    temp.innerHTML = this;
    var result = temp.childNodes[0].nodeValue;
    temp.removeChild(temp.firstChild);

    return result;
};
String.prototype.htmlEntities = function () {
    return String(this).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};