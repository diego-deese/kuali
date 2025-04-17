import { View } from 'react-native'
//import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import DocumentCard from '../../components/DocumentCard/DocumentCard'

export default function InfoEvent() {
  // const { id, title, date } = useLocalSearchParams()

  const handleUpload = (docId: number) => {
    // Lógica para subir documento
    console.log(`Subiendo documento ${docId}`)
  }

  const handleDelete = (docId: number) => {
    // Lógica para eliminar documento
    console.log(`Eliminando documento ${docId}`)
  }

  return (
    <SafeAreaView>
      <View>
        <DocumentCard
          title='Documento 1'
          description='Solicita este documento en servicios escolares'
          status='pending'
          onUpload={() => handleUpload(1)}
          onDelete={() => handleDelete(1)}
        />

        <DocumentCard
          title='Documento 2'
          description='Solicita este documento en servicios escolares'
          status='completed'
          onUpload={() => handleUpload(2)}
          onDelete={() => handleDelete(2)}
        />

        <DocumentCard
          title='Documento 3'
          description='Descarga y llena el formulario'
          status='rejected'
          onUpload={() => handleUpload(3)}
          onDelete={() => handleDelete(3)}
        />
      </View>
    </SafeAreaView>
  )
}
