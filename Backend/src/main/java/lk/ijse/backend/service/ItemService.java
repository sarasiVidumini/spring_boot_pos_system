package lk.ijse.backend.service;

import lk.ijse.backend.dto.ItemDTO;

import java.util.List;

public interface ItemService {

    public void saveItem(ItemDTO itemDTO);

    public void updateItem(ItemDTO itemDTO);

    public void deleteItem(long id);

    public List<ItemDTO> getAllItems();

}
