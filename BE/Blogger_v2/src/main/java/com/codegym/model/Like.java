package com.codegym.model;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "Likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @ManyToOne
    private Post post;
    @NotNull
    @ManyToOne
    private User user;

    public Like(Long id, Post post, User user) {
        this.id = id;
        this.post = post;
        this.user = user;
    }

    public Like() {
    }

    public Like(Post post, User user) {
        this.post = post;
        this.user = user;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post postId) {
        this.post = postId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}