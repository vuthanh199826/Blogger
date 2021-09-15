package com.codegym.message.request;

import jdk.jfr.DataAmount;
import lombok.Data;

@Data
public class CommentPostCreate {
    private String text;
    private String id;

    public CommentPostCreate(String text, String id) {
        this.text = text;
        this.id = id;
    }

    public CommentPostCreate() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
