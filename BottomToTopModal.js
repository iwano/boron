var modalFactory = require('./modalFactory');
var insertKeyframesRule = require('domkit/insertKeyframesRule');
var appendVendorPrefix = require('domkit/appendVendorPrefix');

var animation = {
    show: {
        animationDuration: '0.4s',
        animationTimingFunction: 'lineal'
    },
    hide: {
        animationDuration: '0.5s',
        animationTimingFunction: 'linear'
    },
    submit: {
        animationDuration: '0.4s',
        animationTimingFunction: 'linear'
    },
    showContentAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0,
            transform: 'translate3d(0, calc(100vh - 50%), 0)'
        },
        '60%': {
            opacity: 1,
            transform: 'translate3d(0, -40px, 0)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        }
    }),

    hideContentAnimation: insertKeyframesRule({
        '0%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        },
        '100%': {
            opacity: 0,
            transform: 'translate3d(0, calc(100vh + 50%), 0)'
        },
    }),

    submitContentAnimation: insertKeyframesRule({
        '0%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        },
        '40%': {
          opacity: 1,
          transform: 'translate3d(0, 40px, 0)'
        },
        '100%': {
            opacity: 0,
            transform: 'translate3d(0, calc(-100vh + 50%), 0)'
        },
    }),

    showBackdropAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 0.9
        },
    }),

    hideBackdropAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0.9
        },
        '90%': {
            opactiy: 0.9
        },
        '100%': {
            opacity: 0
        }
    })
};

var showAnimation = animation.show;
var hideAnimation = animation.hide;
var submitAnimation = animation.submit;
var showContentAnimation = animation.showContentAnimation;
var hideContentAnimation = animation.hideContentAnimation;
var submitContentAnimation = animation.submitContentAnimation;
var showBackdropAnimation = animation.showBackdropAnimation;
var hideBackdropAnimation = animation.hideBackdropAnimation;

module.exports = modalFactory({
    getRef: function(willHidden, willSubmit) {
        return 'content';
    },
    getModalStyle: function(willHidden, willSubmit) {
        return appendVendorPrefix({
            zIndex: 1050,
            position: "fixed",
            width: "500px",
            transform: "translate3d(-50%, -50%, 0)",
            top: "50%",
            left: "50%"
        });
    },
    getBackdropStyle: function(willHidden, willSubmit) {
        return appendVendorPrefix({
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
            backgroundColor: "#373A47",
            animationFillMode: 'forwards',
            animationDuration: '0.3s',
            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        });
    },
    getContentStyle: function(willHidden, willSubmit) {
        return appendVendorPrefix({
            margin: 0,
            backgroundColor: "white",
            animationDuration: (willSubmit ? submitAnimation : (willHidden ? hideAnimation : showAnimation)).animationDuration,
            animationFillMode: 'forwards',
            animationName: willSubmit ? submitContentAnimation : (willHidden ? hideContentAnimation : showContentAnimation),
            animationTimingFunction: (willSubmit ? submitAnimation : (willHidden ? hideAnimation : showAnimation)).animationTimingFunction
        });
    }
});
