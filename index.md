---
title: Kyraha - Bring me that horizon
layout: default
bodyClass: page-home
---

{% for feature in site.data.front_links %}
  <div style="display: flex">
  <div style="width: 20%">
  <a href="{{feature.url}}"><img src="{{ feature.image }}" /></a>
  </div>
  <div style="width: 80%">
  <p>{{ feature.text }}</p>
  <p><a href="{{feature.url}}">{{feature.url}}</a></p>
  </div>
  </div>
  * * *
{% endfor %}
