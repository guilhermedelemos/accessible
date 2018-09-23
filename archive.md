---
layout: page
title: Archive
permalink: /archive/
icon: fas fa-archive
---

<hr>

<h1>Blog</h1>
<ul>
{% for post in site.posts %}
<li>[{{ post.date | date: "%d/%m/%Y" }}] <a href="{{ post.url }}">{{post.title}}</a></li>
{% endfor %}
</ul>

<hr>

<h1>Curriculum</h1>
Test.

