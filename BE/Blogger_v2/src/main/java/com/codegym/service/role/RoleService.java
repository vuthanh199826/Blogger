package com.codegym.service.role;
import com.codegym.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.codegym.repository.*;
import java.util.Optional;
@Service
public class RoleService implements IRoleService{
    @Autowired
    private IRoleRepository repository;
    @Override
    public Iterable<Role> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Role save(Role role) {
        return repository.save(role);
    }

    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Role> findByName(RoleName roleName) {
        return repository.findByName(roleName);
    }
}
