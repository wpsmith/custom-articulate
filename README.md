Customizing Articulate Storyline
=================

To Customize Articulate for every publication:

1. Edit player.html in Program Files > Articulate > Articulate Storyline > Content. See __customize-player__ folder.
2. Create js file in Program Files > Articulate > Articulate Storyline > Content > lms. See __customize-output__ folder.

To Customize Articulate specific output, edit the following files:
  * _index_lms_html5.html_:
Find `<script src="story_content/custom.js" type="text/javascript"></script>` and place `<script src="story_content/user.js" type="text/javascript"></script>` on the line before it.
  * _story_html5.html_:
Find `document.write("<scr" + "ipt src='" + globals.strContentFolder + "/user.js' type='text/javascript' charset='utf-8'><\/scr" + "ipt>");` and place `document.write("<scr" + "ipt src='" + globals.strContentFolder + "/custom.js' type='text/javascript' charset='utf-8'><\/scr" + "ipt>");` on the line before it.
  * _story.html_:
Find `<script LANGUAGE="JavaScript1.2" SRC="story_content/user.js" TYPE="text/javascript"></script>` and place `<script LANGUAGE="JavaScript1.2" SRC="story_content/custom.js" TYPE="text/javascript"></script>` on the line before it.
  * _imsmanifest.xml_:
Find `<file href="story_content/user.js" />` and add `<file href="story_content/custom.js" />` on the line before it.
