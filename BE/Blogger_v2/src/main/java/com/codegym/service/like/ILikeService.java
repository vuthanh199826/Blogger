package com.codegym.service.like;

import com.codegym.model.Like;
import com.codegym.service.IGeneralService;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface ILikeService extends IGeneralService<Like> {
    Optional<Like> findByIdUserAndIdPost(Long idUser,Long idPost);
    Iterable<Like> findtop();
    List<Like> findByIdPost(Long idPost);
    Boolean findByUser(Long idUser, Long idPost);
    Iterable<Like> findTop5();
}
