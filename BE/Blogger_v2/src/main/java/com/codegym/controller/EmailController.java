package com.codegym.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RestController
@CrossOrigin("*")
public class EmailController {
    @Autowired
    private JavaMailSender javaMailSender;

    @GetMapping("/api/email/{id}/{email}")
    public void sendEmail(@PathVariable Long id, @PathVariable String email) throws MessagingException {
        String subject = "Title";
        String senderName = "admin";
        String mailContent = "<h4>Dear "+email+"</h4>";
        mailContent += "<a href='http://localhost:4200/post/view/"+id+"'><p>You received a share from a friend on Blogger</p></a>";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        helper.setFrom(senderName);
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }


}
