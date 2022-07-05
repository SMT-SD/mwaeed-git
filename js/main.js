$(".help-owl").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    rtl: true,
    dots: false,
    nav: true,
    navText: ["<i class='fa-solid fa-circle-right'></i>", "<i class='fa-solid fa-circle-left'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});

$(".price-owl").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    rtl: true,
    dots: false,
    nav: true,
    navText: ["<i class='fa-solid fa-circle-right'></i>", "<i class='fa-solid fa-circle-left'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});

// header fixed
$(window).scroll(function () {
    if ($(this).scrollTop() >= 150) {
        $(".fixed-header").css("background-color", "#2a3694e8");
        $(".fixed-header").css("box-shadow", "0px 5px 15px 0px #2a3694e8");
    } else {
        $(".fixed-header").css("background-color", "transparent");
        $(".fixed-header").css("box-shadow", "none");
    }
});

var dialLines = document.getElementsByClassName("diallines");
var clockEl = document.getElementsByClassName("clock")[0];

for (var i = 1; i < 60; i++) {
    clockEl.innerHTML += "<div class='diallines'></div>";
    dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function clock() {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        date = d.getDate(),
        month = d.getMonth() + 1,
        year = d.getFullYear(),
        hDeg = h * 30 + m * (360 / 720),
        mDeg = m * 6 + s * (360 / 3600),
        sDeg = s * 6,
        hEl = document.querySelector(".hour-hand"),
        mEl = document.querySelector(".minute-hand"),
        sEl = document.querySelector(".second-hand"),
        dateEl = document.querySelector(".date"),
        dayEl = document.querySelector(".day");

    var day = weekday[d.getDay()];

    if (month < 9) {
        month = "0" + month;
    }

    hEl.style.transform = "rotate(" + hDeg + "deg)";
    mEl.style.transform = "rotate(" + mDeg + "deg)";
    sEl.style.transform = "rotate(" + sDeg + "deg)";
    dateEl.innerHTML = date + "/" + month + "/" + year;
    dayEl.innerHTML = day;
}

setInterval("clock()", 100);

$("#send").click(function (e) {
    grecaptcha.ready(function () {
        grecaptcha.execute("6LfRgMYgAAAAALZZPu7NOunrdXC6jwchIvrjqiVo", { action: "submit" }).then(function (token) {
            $("#recaptcha").val(token);
            $("form").submit();
            localStorage.setItem("formSubmitted", true);
        });
    });
});

$(document).ready(() => {
    if (localStorage.getItem("formSubmitted")) {
        alert("تم الارسال بنجاح، شكرا لتواصلك معنا.");
        localStorage.removeItem("formSubmitted");
    }
});
