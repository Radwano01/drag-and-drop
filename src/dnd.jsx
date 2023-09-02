import React, { useEffect, useState } from 'react';

const DragAndDrop = () => {
    const defaultBox1Items = [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      { id: 4, text: 'Item 4' },
    ];
  
    // Initialize the state based on localStorage or default values
    const [box1Items, setBox1Items] = useState(() => {
      const savedData = localStorage.getItem('dnd1');
      return savedData ? JSON.parse(savedData) : defaultBox1Items;
    });
  
    const [box2Items, setBox2Items] = useState(() => {
      const savedData = localStorage.getItem('dnd2');
      return savedData ? JSON.parse(savedData) : [];
    });
  
    const handleDragStart = (e, id) => {
      e.dataTransfer.setData('text/plain', id);
    };
  
    const handleDropBox1 = (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggedItem = box2Items.find((item) => item.id.toString() === id);
  
      if (draggedItem) {
        const updatedBox1Items = [...box1Items, draggedItem];
        setBox1Items(updatedBox1Items);
  
        const updatedBox2Items = box2Items.filter((item) => item.id.toString() !== id);
        setBox2Items(updatedBox2Items);
      }
    };
  
    const handleDropBox2 = (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggedItem = box1Items.find((item) => item.id.toString() === id);
  
      if (draggedItem) {
        const updatedBox2Items = [...box2Items, draggedItem];
        setBox2Items(updatedBox2Items);
  
        const updatedBox1Items = box1Items.filter((item) => item.id.toString() !== id);
        setBox1Items(updatedBox1Items);
      }
    };
  
    const allowDrop = (e) => {
      e.preventDefault();
    };
  
    // Save the state to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem('dnd1', JSON.stringify(box1Items));
      localStorage.setItem('dnd2', JSON.stringify(box2Items));
    }, [box1Items, box2Items]);

  return (
    <div style={{ display: 'flex', alignContent:"center", justifyContent: 'space-between',maxWidth:"800px",height:"50%", margin: '0 auto' }}>
      <div
        onDrop={handleDropBox1}
        onDragOver={allowDrop}
        style={{
          flex: 2,
          border: '2px dashed #ccc',
          padding: '16px',
          minHeight: '300px',
          background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
          borderRadius: '10px',
          marginRight: '10px',
          marginTop:"100px"
        }}
      >
        <h2>Box 1</h2>
        {box1Items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            style={{
              border: '1px solid #ddd',
              padding: '12px',
              marginBottom: '12px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      <div
        onDrop={handleDropBox2}
        onDragOver={allowDrop}
        style={{
          flex: 2,
          border: '2px dashed #ccc',
          padding: '16px',
          minHeight: '300px',
          background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
          borderRadius: '10px',
          marginLeft: '10px',
          marginTop:"100px"
        }}
      >
        <h2>Box 2</h2>
        {box2Items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            style={{
              border: '1px solid #ddd',
              padding: '12px',
              marginBottom: '12px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;
