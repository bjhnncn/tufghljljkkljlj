function openDietPlan(planId) {
    const plans = {
        'beginner-diet': `
            <h2>Beginner Diet Plan</h2>
            <div class="meal-item">Meal 1: Oatmeal with fruits, Boiled eggs, Green tea</div>
            <div class="meal-item">Meal 2: Greek yogurt with honey, Handful of nuts</div>
            <div class="meal-item">Meal 3: Grilled chicken breast, Quinoa or brown rice, Steamed vegetables</div>
            <div class="meal-item">Meal 4: Protein shake, Apple slices</div>
            <div class="meal-item">Meal 5: Baked salmon, Sweet potato, Mixed salad</div>`,
        // Add other plans here
    };

    const planContent = plans[planId];
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <style>
            body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
            }
            .meal-item {
                margin: 10px 0;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .back-btn-container {
                margin-top: 20px;
                text-align: center;
            }
            .back-btn {
                cursor: pointer;
                padding: 10px 20px;
                background-color: #008000;
                color: #fff;
                border: none;
                border-radius: 5px;
            }
        </style>
        <div>
            <div class="meal-plan">
                ${planContent}
            </div>
            <div class="back-btn-container">
                <button class="back-btn" onclick="window.parent.focus(); window.close();">Back to Main Menu</button>
            </div>
        </div>
    `);
    newWindow.document.close();
}
