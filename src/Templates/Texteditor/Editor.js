// import React ,{useEffect}from 'react';
// import { Box } from '@mui/material';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Table from '@tiptap/extension-table';
// import TableRow from '@tiptap/extension-table-row';
// import TableCell from '@tiptap/extension-table-cell';
// import TextStyle from '@tiptap/extension-text-style';
// import Underline from '@tiptap/extension-underline';
// import Subscript from '@tiptap/extension-subscript';
// import Superscript from '@tiptap/extension-superscript';
// import Color from '@tiptap/extension-color';
// import Highlight from '@tiptap/extension-highlight';
// import TaskList from '@tiptap/extension-task-list';
// import TaskItem from '@tiptap/extension-task-item';
// import TableHeader from '@tiptap/extension-table-header';
// import Image from '@tiptap/extension-image';

// import FontFamily from './FontFamily';
// import FontSize from './FontSize';
// import './editor.css';
// import {
//   MenuButtonAddTable,
//   MenuButtonBlockquote,
//   MenuButtonBold,
//   MenuButtonBulletedList,
//   MenuButtonCode,
//   MenuButtonCodeBlock,
//   MenuButtonEditLink,
//   MenuButtonHighlightColor,
//   MenuButtonHorizontalRule,
//   MenuButtonImageUpload,
//   MenuButtonIndent,
//   MenuButtonItalic,
//   MenuButtonOrderedList,
//   MenuButtonRedo,
//   MenuButtonRemoveFormatting,
//   MenuButtonStrikethrough,
//   MenuButtonSubscript,
//   MenuButtonSuperscript,
//   MenuButtonTaskList,
//   MenuButtonTextColor,
//   MenuButtonUnderline,
//   MenuButtonUndo,
//   MenuButtonUnindent,
//   MenuControlsContainer,
//   MenuDivider,
//   MenuSelectFontFamily,
//   MenuSelectFontSize,
//   MenuSelectHeading,
//   MenuSelectTextAlign,
//   RichTextEditorProvider,
//   isTouchDevice,
// } from 'mui-tiptap';
// import { useTheme } from '@mui/material';

// export default function Editor({ initialContent,onChange}) {
//   const theme = useTheme();
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Table,
//       TableRow,
//       TableCell,
//       TableHeader,
//       TextStyle,
//       Underline,
//       Subscript,
//       Superscript,
//       Color,
//       Highlight,
//       TaskList,
//       TaskItem.configure({
//         nested: true,
//       }),
//       Image,
//       FontFamily,
//       FontSize,
    
//     ],
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       onChange(html); // Call the onChange prop with the current content
//     },
//   });

//   if (!editor) {
//     return null;
//   }
  
//   const handleUploadFiles = (files) => {
//     return files.map((file) => ({
//       src: URL.createObjectURL(file),
//       alt: file.name,
//     }));
//   };
//   useEffect(() => {
//     if (editor && initialContent) {
//       editor.commands.setContent(initialContent);
//     }
//   }, [initialContent, editor]);
//   return (
//     <Box
//       sx={{
//         border: '1px solid grey',
//         borderRadius: '4px',
//         overflow: 'hidden',
       
//       }}
//     >
//       <RichTextEditorProvider editor={editor}>
//         <Box sx={{ padding: '10px'}}>
//           <MenuControlsContainer>
//             <MenuSelectFontFamily
//               options={[
//                 { label: 'Comic Sans', value: 'Comic Sans MS, Comic Sans' },
//                 { label: 'Cursive', value: 'cursive' },
//                 { label: 'Monospace', value: 'monospace' },
//                 { label: 'Serif', value: 'serif' },
//               ]}
//             />
//             <MenuDivider />
//             <MenuSelectHeading />
//             <MenuDivider />
//             <MenuSelectFontSize />
//             <MenuDivider />
//             <MenuButtonBold />
//             <MenuButtonItalic />
//             <MenuButtonUnderline />
//             <MenuButtonStrikethrough />
//             <MenuButtonSubscript />
//             <MenuButtonSuperscript />
//             <MenuDivider />
//             <MenuButtonTextColor
//               defaultTextColor={theme.palette.text.primary}
//               swatchColors={[
//                 { value: '#000000', label: 'Black' },
//                 { value: '#ffffff', label: 'White' },
//                 { value: '#888888', label: 'Grey' },
//                 { value: '#ff0000', label: 'Red' },
//                 { value: '#ff9900', label: 'Orange' },
//                 { value: '#ffff00', label: 'Yellow' },
//                 { value: '#00d000', label: 'Green' },
//                 { value: '#0000ff', label: 'Blue' },
//               ]}
//             />
//             <MenuButtonHighlightColor
//               swatchColors={[
//                 { value: '#595959', label: 'Dark grey' },
//                 { value: '#dddddd', label: 'Light grey' },
//                 { value: '#ffa6a6', label: 'Light red' },
//                 { value: '#ffd699', label: 'Light orange' },
//                 { value: '#ffff00', label: 'Yellow' },
//                 { value: '#99cc99', label: 'Light green' },
//                 { value: '#90c6ff', label: 'Light blue' },
//                 { value: '#8085e9', label: 'Light purple' },
//               ]}
//             />
//             <MenuDivider />
//             <MenuButtonEditLink />
//             <MenuDivider />
//             <MenuSelectTextAlign />
//             <MenuDivider />
//             <MenuButtonOrderedList />
//             <MenuButtonBulletedList />
//             <MenuButtonTaskList />
//             {isTouchDevice() && (
//               <>
//                 <MenuButtonIndent />
//                 <MenuButtonUnindent />
//               </>
//             )}
//             <MenuDivider />
//             <MenuButtonBlockquote />
//             <MenuDivider />
//             <MenuButtonCode />
//             <MenuButtonCodeBlock />
//             <MenuDivider />
//             <MenuButtonImageUpload onUploadFiles={handleUploadFiles} />
//             <MenuDivider />
//             <MenuButtonHorizontalRule />
//             <MenuButtonAddTable />
//             <MenuDivider />
//             <MenuButtonRemoveFormatting />
//             <MenuDivider />
//             <MenuButtonUndo />
//             <MenuButtonRedo />
//           </MenuControlsContainer>
//         </Box>

//         <div className="editor-container">
          
//           <EditorContent editor={editor} className="editor-content" style={{ borderTop: '1px solid grey',padding:'10px' }} />
//         </div>
//       </RichTextEditorProvider>
//     </Box>
//   );
// }




import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import './editor.css';
import {
  MenuButtonAddTable,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonHorizontalRule,
  MenuButtonImageUpload,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonSubscript,
  MenuButtonSuperscript,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontFamily,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditorProvider,
  isTouchDevice,
} from 'mui-tiptap';
import { useTheme } from '@mui/material';

export default function Editor({ initialContent, onChange }) {
  const theme = useTheme();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      TextStyle,
      Underline,
      Subscript,
      Superscript,
      Color,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      FontFamily,
      FontSize,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html); // Call the onChange prop with the current content
    },
  });

  const handleUploadFiles = (files) => {
    return files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));
  };

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        border: '1px solid grey',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <RichTextEditorProvider editor={editor}>
        <Box sx={{ padding: '10px' }}>
          <MenuControlsContainer>
            <MenuSelectFontFamily
              options={[
                { label: 'Comic Sans', value: 'Comic Sans MS, Comic Sans' },
                { label: 'Cursive', value: 'cursive' },
                { label: 'Monospace', value: 'monospace' },
                { label: 'Serif', value: 'serif' },
              ]}
            />
            <MenuDivider />
            <MenuSelectHeading />
            <MenuDivider />
            <MenuSelectFontSize />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonUnderline />
            <MenuButtonStrikethrough />
            <MenuButtonSubscript />
            <MenuButtonSuperscript />
            <MenuDivider />
            <MenuButtonTextColor
              defaultTextColor={theme.palette.text.primary}
              swatchColors={[
                { value: '#000000', label: 'Black' },
                { value: '#ffffff', label: 'White' },
                { value: '#888888', label: 'Grey' },
                { value: '#ff0000', label: 'Red' },
                { value: '#ff9900', label: 'Orange' },
                { value: '#ffff00', label: 'Yellow' },
                { value: '#00d000', label: 'Green' },
                { value: '#0000ff', label: 'Blue' },
              ]}
            />
            <MenuButtonHighlightColor
              swatchColors={[
                { value: '#595959', label: 'Dark grey' },
                { value: '#dddddd', label: 'Light grey' },
                { value: '#ffa6a6', label: 'Light red' },
                { value: '#ffd699', label: 'Light orange' },
                { value: '#ffff00', label: 'Yellow' },
                { value: '#99cc99', label: 'Light green' },
                { value: '#90c6ff', label: 'Light blue' },
                { value: '#8085e9', label: 'Light purple' },
              ]}
            />
            <MenuDivider />
            <MenuButtonEditLink />
            <MenuDivider />
            <MenuSelectTextAlign />
            <MenuDivider />
            <MenuButtonOrderedList />
            <MenuButtonBulletedList />
            <MenuButtonTaskList />
            {isTouchDevice() && (
              <>
                <MenuButtonIndent />
                <MenuButtonUnindent />
              </>
            )}
            <MenuDivider />
            <MenuButtonBlockquote />
            <MenuDivider />
            <MenuButtonCode />
            <MenuButtonCodeBlock />
            <MenuDivider />
            <MenuButtonImageUpload onUploadFiles={handleUploadFiles} />
            <MenuDivider />
            <MenuButtonHorizontalRule />
            <MenuButtonAddTable />
            <MenuDivider />
            <MenuButtonRemoveFormatting />
            <MenuDivider />
            <MenuButtonUndo />
            <MenuButtonRedo />
          </MenuControlsContainer>
        </Box>

        <div className="editor-container">
          <EditorContent editor={editor} className="editor-content" style={{ borderTop: '1px solid grey', padding: '10px' }} />
        </div>
      </RichTextEditorProvider>
    </Box>
  );
}


