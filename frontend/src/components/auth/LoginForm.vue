<template>
  <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
    <VStack spacing={4} align="flex-start" w="full">
      <VStack spacing={1} :align="['center', 'center', 'flex-start']" w="full">
        <Heading>Вход в систему</Heading>
        <Text>Введите ваши учетные данные</Text>
      </VStack>

      <FormControl isInvalid="!!errors.username">
        <FormLabel>Имя пользователя</FormLabel>
        <Input
          v-model="form.username"
          placeholder="Введите имя пользователя"
          @keyup.enter="handleSubmit"
        />
        <FormErrorMessage>{{ errors.username }}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid="!!errors.password">
        <FormLabel>Пароль</FormLabel>
        <InputGroup>
          <Input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Введите пароль"
            @keyup.enter="handleSubmit"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" @click="showPassword = !showPassword">
              {{ showPassword ? 'Скрыть' : 'Показать' }}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{{ errors.password }}</FormErrorMessage>
      </FormControl>

      <Button
        rounded="md"
        colorScheme="blue"
        w="full"
        :isLoading="isLoading"
        @click="handleSubmit"
      >
        Войти
      </Button>

      <HStack justify="space-between" w="full">
        <Button variant="link" @click="$emit('forgot-password')">
          Забыли пароль?
        </Button>
      </HStack>
    </VStack>
  </Box>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from '@chakra-ui/vue'
import axios from 'axios'

const emit = defineEmits(['login-success', 'forgot-password'])
const toast = useToast()

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.password = ''

  if (!form.username) {
    errors.username = 'Имя пользователя обязательно'
    isValid = false
  }
  if (!form.password) {
    errors.password = 'Пароль обязателен'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    const formData = new FormData()
    formData.append('username', form.username)
    formData.append('password', form.password)

    const response = await axios.post('/api/v1/auth/login', formData)
    localStorage.setItem('token', response.data.access_token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
    
    emit('login-success')
    toast({
      title: 'Успешный вход',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  } catch (error) {
    toast({
      title: 'Ошибка входа',
      description: error.response?.data?.detail || 'Неверное имя пользователя или пароль',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  } finally {
    isLoading.value = false
  }
}
</script> 