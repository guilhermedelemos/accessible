---
layout: page
title: Arquivo
permalink: /arquivo/
---

<hr>

<h1>Blog</h1>
<ul>
{% for post in site.posts %}
<li>[{{ post.date | date: "%d/%m/%Y" }}] <a href="{{ post.url }}">{{post.title}}</a></li>
{% endfor %}
</ul>

<hr>

<h1>Curriculo</h1>
Teste .

