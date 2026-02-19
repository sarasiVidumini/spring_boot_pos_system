package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.ItemDTO;
import lk.ijse.backend.entity.Item;
import lk.ijse.backend.repository.ItemRepo;
import lk.ijse.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ItemServiceIMPL implements ItemService {
    private final ItemRepo itemRepo;
    private final ModelMapper modelMapper;

    @Override
    public void saveItem(ItemDTO itemDTO){
        itemRepo.save(modelMapper.map(itemDTO, Item.class));
    }

    @Override
    public void updateItem(ItemDTO itemDTO){
        itemRepo.save(modelMapper.map(itemDTO, Item.class));
    }

    @Override
    public void deleteItem(long id){
        itemRepo.deleteById(id);
    }

    @Override
    public List<ItemDTO> getAllItems(){
        List<Item> items = itemRepo.findAll();
        return modelMapper.map(items,new TypeToken<List<ItemDTO>>() {}.getType());
    }
}
