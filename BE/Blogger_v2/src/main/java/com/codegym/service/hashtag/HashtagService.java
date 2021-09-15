package com.codegym.service.hashtag;
import com.codegym.model.Hashtag;
import com.codegym.service.hashtag.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.codegym.repository.*;

import java.util.List;
import java.util.Optional;
@Service
public class HashtagService implements IHashtagService{
    @Autowired
    private IHashtagRepository hashtagRepository;
    @Override
    public List<Hashtag> findAll() {
        return hashtagRepository.findAll();
    }

    @Override
    public Optional<Hashtag> findById(Long id) {
        return hashtagRepository.findById(id);
    }

    @Override
    public Hashtag save(Hashtag hashtag) {
        return hashtagRepository.save(hashtag);
    }

    @Override
    public void remove(Long id) {
        hashtagRepository.deleteById(id);
    }

    @Override
    public Iterable<Hashtag> findTopHashtagByPost() {
        return hashtagRepository.findTopHashtagByPost();
    }
}
