---
layout: default
title: Home
---

<div class="postList">
  {% for post in site.posts %}
  <button class="postButton" onclick="window.location.href='{{ post.url | relative_url }}'">
    <h3>{{ post.title }}</h3>
    <p class="postDate"> {{ post.date | date: "%B %d, %Y" }}</p>
  </button>
  {% endfor %}
</div>
