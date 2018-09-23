---
layout: page
title: Blog
permalink: /blog/
icon: fas fa-copy
---

<ul>
{% for post in site.posts %}
<li>[{{ post.date | date: "%d/%m/%Y" }}] <a href="{{ post.url }}">{{post.title}}</a></li>
{% endfor %}
</ul>
