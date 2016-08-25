ColorBlind App
===============

Simple Cordova app about color blindness

Install
-------

```
$ npm install
```

Build
-----

```bash
$ cordova prepare
$ grunt build
```

Run & watch
-----------

```bash
$ grunt
```

Add platform or Plugin
----------------------

`./platforms/` & `./plugins` are ignored by git. So don't forget to save any change.

```bash
$ cordova platform add <platform> --save
$ cordova plugin add <plugin> --save
```

TODO's
------

 - [X] Save theme choice in localstorage [DONE] waiting for PR validation (clean bower file)
 - [ ] Better numpad

Developers
-----------

 - Cedric FROSSARD

Licence
-------
Apache Licence 2.0
