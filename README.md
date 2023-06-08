RM94269 | Douglas Welber Santos de Aguiar <br/>
RM94278 | Leonardo Silva Macedo <br/>
RM94395 | Samuel Pereira Nascimento

Professor, utilize essa API key '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' para requisições no chatGPT

## Endpoints

- Users
    - [create user](#create-user)
    - [update user](#update-user)
    - [find user by id](#find-user-by-id)
    - [delete user](#delete-user)
    - [login](#login)
- Ingredients
    - [create ingredient](#create-ingredient)
    - [update ingredient](#update-ingredient)
    - [delete ingredient](#delete-ingredient)
- Recipes
    - [create recipe](#create-recipe)
    - [find recipe by id](#find-recipe-by-id)
    - [find all recipes](#find-all-recipes)
    - [delete recipe](#delete-recipe)
- Diets
    - [create diet](#create-diet)
    - [find diet by id](#find-diet-by-id)
    - [find all diets](#find-all-diets)
    - [delete diet](#delete-diet)

---

### Create User

`POST` /nuture/users

**Requisition Fields**

| field          | type   | mandatory | description                                      |
|----------------|--------|:---------:|--------------------------------------------------|
| name           | String |    yes    | user's name                                      |
| cpf            | long   |    yes    | user's CPF                                       |
| email          | String |    yes    | user's e-mail for contact                        |
| weight         | String |    yes    | user's weight                                    |
| height         | String |    yes    | user's height                                    |
| birthday       | date   |    yes    | user's birthday                                  |
| sex            | String |    yes    | user's gender                                    |
| food frequency | enum   |    yes    | frequency that the user eats through the day     |
| password       | String |    yes    | user's password                                  |
| ddi            | int    |    yes    | international direct dialing of the user's phone |
| ddd            | int    |    yes    | distance direct dialing of the user's phone      |
| phone_number   | int    |    yes    | user's phone number                              |

**Requisition Body Example**

```js
{
    "name": "Jonathan Gates",
    "cpf": 12345698745,
    "email": "jonathan.gates@email.com",
    "weight": "100kg",
    "height": "175cm",
    "birthday": "1991-12-25",
    "sex": "male",
    "food_frequency": "THREE_MEALS",
    "password": "hellouuuu",
    "phone": {
       "ddi": 55,
       "ddd": 11,
       "phone_number": 938223827
    }
}
```

**Responses Codes**

| code | description                                            |
|------|--------------------------------------------------------|
| 201  | user successfully created                              |
| 400  | invalid fields                                         |

---

### Update User

`PUT` /nuture/users/{id}

**Requisition Fields**

| field          | type   | mandatory | description                                      |
|----------------|--------|:---------:|--------------------------------------------------|
| name           | String |    no     | user's name                                      |
| cpf            | long   |    no     | user's CPF                                       |
| email          | String |    no     | user's e-mail for contact                        |
| weight         | String |    no     | user's weight                                    |
| height         | String |    no     | user's height                                    |
| birthday       | date   |    no     | user's birthday                                  |
| sex            | String |    no     | user's gender                                    |
| food frequency | enum   |    no     | frequency that the user eats through the day     |
| password       | String |    no     | user's password                                  |
| ddi            | int    |    no     | international direct dialing of the user's phone |
| ddd            | int    |    no     | distance direct dialing of the user's phone      |
| phone_number   | int    |    no     | user's phone number                              |

**Requisition Body Example**

```js
{
    "name": "Jonathan Gates",
    "cpf": 12345698742,
    "email": "jonathan@email.com",
    "weight": "100kg",
    "height": "175cm",
    "birthday": "1991-12-25",
    "sex": "male",
    "food_frequency": "THREE_MEALS",
    "password": "hellouuuu",
    "phone": {
       "ddi": 55,
       "ddd": 11,
       "phone_number": 938223827
    }
}
```

**Responses Codes**

| code | description               |
|------|---------------------------|
| 201  | user successfully updated |
| 400  | invalid fields            |
| 404  | user not found            |

---

### Find User By Id

`GET` /nuture/users/{id}

**Response Body Example**

```js
{
    "id": 1
    "name": "Jonathan Gates",
    "cpf": 12345698745,
    "email": "jonathan.gates@email.com",
    "weight": "100kg",
    "height": "175cm",
    "birthday": "1991-12-25",
    "sex": "male",
    "food_frequency": "THREE_MEALS",
    "password": "hellouuuu",
    "phone": {
        "id": 1
        "ddi": 55,
        "ddd": 11,
        "phone_number": 938223827
    },
	"diets": [
	    {
		  "id": 1,
		  "description": "Essa dieta foi planejada para uma pessoa com altura de 1,70m e peso de 70kg, visando suprir suas necessidades nutricionais diárias.",
		  "breakfast": "2 ovos mexidos, 50g de pão integral e uma xícara de chá ou café sem açúcar.",
		  "lunch": "1 concha de feijão (100g), 2 porções de arroz (100g cada) e 100g de ovos cozidos.",
		  "dinner": "1 concha e meia de feijão (150g), 2 porções de arroz (100g cada) e uma salada de vegetais variados."
	    }
	],
	"recipes": [
		{
			"id": 1,
			"name": "Macarrão",
			"description": "Pegue o macarrão coloca na panela com água e faz molho de tomate",
			"ingredients": [
				{
					"id": 1,
					"name": "Pasta",
					"quantity": "500g",
					"category": "Não perecível"
				},
				{
					"id": 2,
					"name": "Tomato",
					"quantity": "5",
					"category": "Fruit"
				}
			]
		}
	]
}
```

**Resposes Codes**

| code | description          |
|------|----------------------|
| 200  | user's data returned |
| 404  | user not found       |

---

### Delete User

`DELETE` /nuture/users/{id}

**Responses Codes**

| code | description    |
|------|----------------|
| 204  | user deleted   |
| 404  | user not found |

---

### Login

`POST` /nuture/users/login

**Requisition Fields**

| field    | type   | mandatory | description     |
|----------|--------|:---------:|-----------------|
| email    | String |    yes    | user's e-mail   |
| password | String |    yes    | user's password |

**Requisition Body Example**

```js
{
    "username": "jonathan.gates@email.com",
    "password": "hellouuuu"
}
```

**Responses Codes**

| code | description  |
|------|--------------|
| 200  | logged in    |
| 403  | user invalid |


---

### Create Ingredient

`CREATE` /nuture/ingredients

**Requisition Fields**

| field          | type   | mandatory | description                                 |
|----------------|--------|:---------:|---------------------------------------------|
| name           | String |    yes    | ingredient's name                           |
| quantity       | String |    yes    | ingredient's quantity                       |
| category       | String |    yes    | ingredient's category                       |
| recipe_id      | Long   |    yes    | ingredient's recipe                         |

**Requisition Body Example**

```js
{
    "name": "Eggs",
    "quantity": "2",
    "category": "Protein",
    "recipe": {
      "id": 1
    }
}
```

**Responses Codes**

| code | description                     |
|------|---------------------------------|
| 201  | ingredient successfully created |
| 400  | invalid fields                  |

---

### Update Ingredient

`PUT` /nuture/ingredients/{id}

**Requisition Fields**

| field          | type   | mandatory | description                                 |
|----------------|--------|:---------:|---------------------------------------------|
| name           | String |    no     | ingredient's name                           |
| quantity       | String |    no     | ingredient's quantity                       |
| category       | String |    no     | ingredient's category                       |
| recipe_id      | Long   |    no     | ingredient's recipe                         |

**Requisition Body Example**

```js
{
    "name": "Eggs",
    "quantity": "2",
    "category": "Protein",
    "recipe": {
      "id": 1
    }
}
```

**Responses Codes**

| code | description                     |
|------|---------------------------------|
| 201  | ingredient successfully updated |
| 400  | invalid fields                  |
| 404  | ingredient not found            |

---

### Delete Ingredient

`DELETE` /nuture/ingredients/{id}

**Responses Codes**

| code | description          |
|------|----------------------|
| 204  | ingredient deleted   |
| 404  | ingredient not found |

---

### Create Recipe

`POST` /nuture/recipes

**Requisition Fields**

| field       | type                | mandatory | description          |
|-------------|---------------------|:---------:|----------------------|
| name        | String              |    yes    | recipe's name        |
| description | String              |    yes    | recipe's description |
| ingredients | List of Ingredients |    yes    | recipe's ingredients |
| user_id     | Long                |    yes    | recipe's user id     |

**Requisition Body Example**

```js
{
    "name": "Chicken Pasta",
    "description": "Cook the penne following pack instructions. Drain and toss with the remaining oil. Tip the pasta into a medium sized ovenproof dish. Stir in the chicken and pour over the sauce. Top with the cheddar, mozzarella and parsley.",
    "ingredients": [
        {
          "name": "Penne",
          "quantity": "500g",
          "category": "Protein"
        },
        {
          "name": "Olive oil",
          "quantity": "4 tbsp",
          "category": "Oil"
        },
        {
          "name": "Cheddar",
          "quantity": "70g",
          "category": "Cheese"
        },
        {
          "name": "Chicken breasts",
          "quantity": "4",
          "category": "Protein"
        }
    ],
		"user": {
        "id": 1
    }
}
```

**Responses Codes**

| code | description                 |
|------|-----------------------------|
| 201  | recipe successfully created |
| 400  | invalid fields              |

---

### Find Recipe By Id

`GET` /nuture/recipes/{id}

**Response Body Example**

```js
{
	"id": 6,
	"name": "Chicken Pasta",
	"description": "Cook the penne following pack instructions. Drain and toss with the remaining oil. Tip the pasta into a medium sized ovenproof dish. Stir in the chicken and pour over the sauce. Top with the cheddar, mozzarella and parsley.",
	"ingredients": [
		{
			"id": 17,
			"name": "Penne",
			"quantity": "500g",
			"category": "Protein"
		},
		{
			"id": 18,
			"name": "Olive oil",
			"quantity": "4 tbsp",
			"category": "Oil"
		},
		{
			"id": 19,
			"name": "Cheddar",
			"quantity": "70g",
			"category": "Cheese"
		},
		{
			"id": 20,
			"name": "Chicken breasts",
			"quantity": "4",
			"category": "Protein"
		}
	]
}
```

**Resposes Codes**

| code | description            |
|------|------------------------|
| 200  | recipe's data returned |
| 404  | recipe not found       |

---

### Find All Recipes

`GET` /nuture/recipes

**Response Body Example**

```js
{
	"content": [
		{
			"id": 6,
			"name": "Chicken Pasta",
			"description": "Cook the penne following pack instructions. Drain and toss with the remaining oil. Tip the pasta into a medium sized ovenproof dish. Stir in the chicken and pour over the sauce. Top with the cheddar, mozzarella and parsley.",
			"ingredients": [
				{
					"id": 17,
					"name": "Penne",
					"quantity": "500g",
					"category": "Protein"
				},
				{
					"id": 18,
					"name": "Olive oil",
					"quantity": "4 tbsp",
					"category": "Oil"
				},
				{
					"id": 19,
					"name": "Cheddar",
					"quantity": "70g",
					"category": "Cheese"
				},
				{
					"id": 20,
					"name": "Chicken breasts",
					"quantity": "4",
					"category": "Protein"
				}
			]
		},
		{
			"id": 1,
			"name": "Macarrão",
			"description": "Pegue o macarrão coloca na panela com água e faz molho de tomate",
			"ingredients": [
				{
					"id": 1,
					"name": "Pasta",
					"quantity": "500g",
					"category": "Não perecível"
				},
				{
					"id": 2,
					"name": "Tomato",
					"quantity": "5",
					"category": "Fruit"
				}
			]
		}
	],
	"pageable": {
		"sort": {
			"empty": false,
			"unsorted": false,
			"sorted": true
		},
		"offset": 0,
		"pageNumber": 0,
		"pageSize": 5,
		"unpaged": false,
		"paged": true
	},
	"last": false,
	"totalPages": 1,
	"totalElements": 2,
	"size": 5,
	"number": 0,
	"sort": {
		"empty": false,
		"unsorted": false,
		"sorted": true
	},
	"first": true,
	"numberOfElements": 5,
	"empty": false
}
```

**Resposes Codes**

| code | description            |
|------|------------------------|
| 200  | recipe's data returned |
| 404  | recipe not found       |

---

### Delete Recipe

`DELETE` /nuture/recipes/{id}

**Responses Codes**

| code | description      |
|------|------------------|
| 204  | recipe deleted   |
| 404  | recipe not found |

---

### Create Diet

`POST` /nuture/diets

**Requisition Fields**

| field            | type   | mandatory | description                            |
|------------------|--------|:---------:|----------------------------------------|
| description      | String |    yes    | diet's description                     |
| breakfast        | String |    yes    | diet's breakfast recommendation        |
| lunch            | String |    yes    | diet's lunch recommendation            |
| afternoon coffee | String |    no     | diet's afternoon coffee recommendation |
| dinner           | String |    yes    | diet's dinner recommendation           |
| user id          | Long   |    yes    | diet's user ID                         |

**Requisition Body Example**

```js
{
    "description": "Essa dieta foi planejada para uma pessoa com altura de 1,75m e peso de 60kg, visando suprir suas necessidades nutricionais diárias.",
    "breakfast": "2 ovos mexidos, 50g de pão integral e uma xícara de chá ou café sem açúcar.",
    "lunch": "1 concha de feijão (100g), 2 porções de arroz (100g cada) e 100g de ovos cozidos.",
    "afternoon_coffee": "2 ovos mexidos, 50g de pão integral e uma fruta de sua escolha.",
    "dinner": "1 concha e meia de feijão (150g), 2 porções de arroz (100g cada) e uma salada de vegetais variados.",
    "user": {
        "id": 1
    }
}
```

**Responses Codes**

| code | description               |
|------|---------------------------|
| 201  | diet successfully created |
| 400  | invalid fields            |

---

### Find Diet By Id

`GET` /nuture/diets/{id}

**Response Body Example**

```js
{
	"id": 2,
	"description": "Essa dieta foi planejada para uma pessoa com altura de 1,75m e peso de 60kg, visando suprir suas necessidades nutricionais diárias.",
	"breakfast": "2 ovos mexidos, 50g de pão integral e uma xícara de chá ou café sem açúcar.",
	"lunch": "1 concha de feijão (100g), 2 porções de arroz (100g cada) e 100g de ovos cozidos.",
	"dinner": "1 concha e meia de feijão (150g), 2 porções de arroz (100g cada) e uma salada de vegetais variados."
}
```

**Resposes Codes**

| code | description          |
|------|----------------------|
| 200  | diet's data returned |
| 404  | diet not found       |

---

### Find All Diets

`GET` /nuture/diets

**Response Body Example**

```js
{
	"content": [
		{
			"id": 1,
			"description": "Essa dieta foi planejada para uma pessoa com altura de 1,62m e peso de 92kg, visando suprir suas necessidades nutricionais diárias.",
			"breakfast": "2 ovos mexidos, 50g de pão integral e uma xícara de chá ou café sem açúcar.",
			"lunch": "1 concha de feijão (100g), 2 porções de arroz (100g cada) e 100g de ovos cozidos.",
			"dinner": "1 concha e meia de feijão (150g), 2 porções de arroz (100g cada) e uma salada de vegetais variados."
		},
		{
			"id": 2,
			"description": "Essa dieta foi planejada para uma pessoa com altura de 1,75m e peso de 60kg, visando suprir suas necessidades nutricionais diárias.",
			"breakfast": "2 ovos mexidos, 50g de pão integral e uma xícara de chá ou café sem açúcar.",
			"lunch": "1 concha de feijão (100g), 2 porções de arroz (100g cada) e 100g de ovos cozidos.",
			"dinner": "1 concha e meia de feijão (150g), 2 porções de arroz (100g cada) e uma salada de vegetais variados."
		}
       ],
	"pageable": {
		"sort": {
			"empty": true,
			"unsorted": true,
			"sorted": false
		},
		"offset": 0,
		"pageNumber": 0,
		"pageSize": 5,
		"unpaged": false,
		"paged": true
	},
	"last": false,
	"totalPages": 2,
	"totalElements": 7,
	"size": 5,
	"number": 0,
	"sort": {
		"empty": true,
		"unsorted": true,
		"sorted": false
	},
	"first": true,
	"numberOfElements": 5,
	"empty": false
}
```

**Resposes Codes**

| code | description          |
|------|----------------------|
| 200  | diet's data returned |

---

### Delete Diet

`DELETE` /nuture/diets/{id}

**Responses Codes**

| code | description    |
|------|----------------|
| 204  | diet deleted   |
| 404  | diet not found |
