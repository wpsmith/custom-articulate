custom-articulate
=================

Customizing Articulate

To Customize Articulate for every publication:
1. Edit player.html in Program Files > Articulate > Articulate Storyline > Content
2. Create js file in Program Files > Articulate > Articulate Storyline > Content > lms

To Customize Articulate specific output:
1. Edit the following files:
* index_lms_html5.html
Find `<script src="story_content/custom.js" type="text/javascript"></script>` and place `<script src="story_content/user.js" type="text/javascript"></script>` on the line before it.
* story_html5.html:
Find `document.write("<scr" + "ipt src='" + globals.strContentFolder + "/user.js' type='text/javascript' charset='utf-8'><\/scr" + "ipt>");` and place `document.write("<scr" + "ipt src='" + globals.strContentFolder + "/custom.js' type='text/javascript' charset='utf-8'><\/scr" + "ipt>");` on the line before it.
* story.html
Find `<script LANGUAGE="JavaScript1.2" SRC="story_content/user.js" TYPE="text/javascript"></script>` and place `<script LANGUAGE="JavaScript1.2" SRC="story_content/custom.js" TYPE="text/javascript"></script>` on the line before it.
* imsmanifest.xml
Find `<file href="story_content/user.js" />` and add `<file href="story_content/custom.js" />` on the line before it.
