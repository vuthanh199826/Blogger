package com.codegym.repository;
import com.codegym.model.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
    Iterable<User> findByUsernameContaining(String user_name);

    @Query(value = "select * from user join post on user.id = post.user_id group by user.id order by count(post.id) desc limit 5", nativeQuery = true)
    Iterable<User> findByTopUser();
}
