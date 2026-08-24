///// DND 
 ///// 
await invoke("update_blocks_parent", { paletteId: targetParent, blockIds: [draggedId] });
await invoke("update_block_order", { reorderBlocks: newReorderBlocks });
///
await invoke("update_blocks_parent", { paletteId: draggedParent, blockIds: [draggedId] });
await invoke("update_block_order", { reorderBlocks: oldReorderBlocks });
///
await invoke("update_blocks_parent", { paletteId: targetParent, blockIds: [draggedId] });
await invoke("update_block_order", { reorderBlocks: newReorderBlocks });
///
const paletteId = await invoke<number>("create_palette", { palette: { name: "New palette", blockIds: [targetBlockId, draggedBlockId] } });
const paletteEntity = await invoke<PaletteEntity>("get_palette", { paletteId });

/////
await invoke("soft_delete_block", { blockId: paletteEntity.blockId });
await invoke("update_blocks_parent", { paletteId: draggedParentId, blockIds: [draggedBlockId] });
await invoke("update_blocks_parent", { paletteId: targetParentId, blockIds: [targetBlockId] });
await invoke("update_block_order", { reorderBlocks: oldReorderBlocks });
//////
await invoke("restore_block", { blockId: paletteEntity.blockId });
const entity = await invoke<PaletteEntity>("get_palette", { paletteId });
await invoke("update_block_order", { reorderBlocks });
await invoke("update_blocks_parent", { paletteId: paletteId, blockIds: [targetBlockId, draggedBlockId] });

///
await invoke("update_blocks_parent", { paletteId: targetPalette, blockIds: [draggedId] });
await invoke("update_block_order", { reorderBlocks: reorderBlocksDrag });
////

await invoke("update_blocks_parent", { paletteId: draggedPalette, blockIds: [draggedId] });
await invoke("update_block_order", { reorderBlocks: oldReorderBlocksDrag });
///
await invoke("update_blocks_parent", { paletteId: targetPalette, blockIds: [draggedId] });
await invoke("update_block_order", { reorderBlocks: reorderBlocksDrag });


//// add blocks 
await invoke("restore_block", { blockId });
const entity = await invoke<ColorEntity>("get_color", { colorId });

// delete blocks 
await invoke("restore_block_", { blockId });
            const entity = await invoke<ColorEntity>("get_color", { colorId: colorId });

await invoke("restore_block_gradient", { blockId });
const entity = await invoke<ColorEntity>("get_gradient", { gradientId });

// duplicate blocks
await invoke("restore_block_color", { colorId });
const entity = await invoke<ColorEntity>("get_color", { colorId });



await invoke("restore_blocks", { blockIds });
const blocks = await invoke<BlockEntity[]>("load_state");

// update-block
//// get_gradinet_summary
//// get_gradinet_layer_summary
//// get_palette_summary





