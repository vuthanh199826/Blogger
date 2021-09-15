package com.codegym.message.request;

import com.codegym.model.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public class ChangePasswordForm {
    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(min = 6, max = 40)
    private String newPassword;
    private String phone;
    private String address;
    private int status;
    private LocalDateTime timeCreated;
    private Set<Role> roles = new HashSet<>();

    public ChangePasswordForm() {
    }

    public ChangePasswordForm(@NotBlank
                                      String username,
                              @NotBlank
                              @Size(min = 6, max = 40)
                                      String password,
                              @NotBlank
                              @Size(min = 6, max = 40)
                                      String newPassword,
                              String phone,
                              String address,
                              int status,
                              LocalDateTime timeCreat,
                              Set<Role> roles
                              ) {
                                this.username = username;
                                this.password = password;
                                this.newPassword = newPassword;
                                this.phone = phone;
                                this.address = address;
                                this.status = status;
                                this.timeCreated = timeCreat;
                                this.roles  = roles;

    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(LocalDateTime timeCreated) {
        this.timeCreated = timeCreated;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
