var todo = function () {



    // private functions & variables

    var _initComponents = function () {

        $('.check-parent').toggle(function () {
            $(this).next().next().slideUp('fast');

        }, function () {
            $(this).next().next().slideDown('fast');

        });

        $('.i-featured').toggle(function () {
            $(this).removeClass('fa-heart-o');
            $(this).addClass('fa-heart');
            $(this).css('color', 'rgb(243, 106, 90)')
        }, function () {
            $(this).removeClass('fa-heart');
            $(this).addClass('fa-heart-o');
            $(this).removeAttr('style');
        });

        // init tags        
        $(".todo-taskbody-tags").select2({
            tags: ["Testing", "Important", "Info", "Pending", "Completed", "Requested", "Approved"]
        });

        //$('[name=\'category[]\']:checked:last').val();

    };

    var _handleProjectListMenu = function () {
        if (Metronic.getViewPort().width <= 992) {
            $('.todo-project-list-content').addClass("collapse");
        } else {
            $('.todo-project-list-content').removeClass("collapse").css("height", "auto");
        }
    }

    // public functions
    return {

        //main function
        init: function () {
            _initComponents();
            _handleProjectListMenu();


            Metronic.addResizeHandler(function () {
                _handleProjectListMenu();
            });
        }

    };


}();

