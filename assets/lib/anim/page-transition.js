jQuery(document).ready(function () {
    localStorage.removeItem("page");

    window.onload = function () {
        var n = jQuery(".vert-loader");
        n.css('height','');
        "true" == localStorage.getItem("page")
            ? setTimeout(function () {
                n.removeClass("show"),
                    setTimeout(function () {
                        n.removeClass("active");
                    }, 750);
            }, 50)
            : n.removeClass("show active");
    };


    jQuery("a").not('.Light a ').on("click", function (t) {
        var o = jQuery(this).attr("href");
        if (!(o.includes("javascript:") ||o.includes("#maphere") || o.includes("#maphere") || o.includes("javascript:;") || "" == o || o.includes("#") || o.includes("tel:") || o.includes("mob:") || o.includes("mailto:") || o.includes("file:") || o.includes("fax:"))) {
            t.preventDefault();
            localStorage.setItem("page", "true"),
                jQuery(".vert-loader").addClass("show active"),
                setTimeout(function () {
                    window.location = o;
                }, 550);
        }
    });
    jQuery(window).on("popstate", function (t) {
        var o;
        t.preventDefault(),
            (localStorage.setItem("page", "true"),
                (o = null !== window.history.state ? window.history.state.href : ""),
                jQuery(".vert-loader").addClass("show active"),
                setTimeout(function () {
                    window.location = o;
                }, 550));
    });













    jQuery(".splitted-text-animation").each(function (i, item) {
        // jQuery(item).css({
        //     visibility: "visible"
        // });
        // setTimeout(function () {
        //     jQuery(item).addClass("inview");
        // }, 10);
    });


    jQuery("#restart").on("click", function (e) {
        jQuery(".splitted-text-animation")
            .removeClass("inview")
            .delay(50)
            .queue(function () {
                jQuery(this).addClass("inview");
                jQuery(this).dequeue();
            });
    });

    var get_first = jQuery('#view_port'),
        get_half = jQuery(window).height() / 1.1;



});










