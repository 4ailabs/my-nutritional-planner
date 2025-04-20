import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function NutritionalPlanner() {
    const daysOfWeek = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ]
    const mealTypes = [
        { name: "Rompe Ayuno", time: "8:00 AM" },
        { name: "Desayuno", time: "11:00 AM" },
        { name: "Comida", time: "3:00 PM" },
        { name: "Colación", time: "6:00 PM" },
        { name: "Cena", time: "9:00 PM" },
    ]

    // Estado para el modal
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState("")

    // Creamos el estado inicial para el plan de comidas
    const initialMealPlan = {}
    daysOfWeek.forEach((day) => {
        initialMealPlan[day] = {}
        mealTypes.forEach((type) => {
            initialMealPlan[day][type.name] = []
        })
    })
    const [mealPlan, setMealPlan] = useState(initialMealPlan)

    // Estado para el elemento que se está arrastrando
    const [draggingItem, setDraggingItem] = useState(null)

    // Platillos recomendados por categoría con colores para distinguir superalimentos y diamante (♢) para metabolic activators
    const platillos = {
        "Rompe Ayuno": [
            "🟢 Piña♢ con chía y canela♢",
            "🟢 Arándanos♢ con yogurt (sin azúcar)",
            "🟢 Sandía♢ con semillas de lino♢",
            "🟢 Pera♢ con té verde♢",
            "🟢 Dátiles♢ rellenos de mantequilla de almendra♢",
            "🟢 Mango♢ con semillas de calabaza♢",
            "🟡 Plátano con nueces",
            "🟡 Guayaba con limón",
            "🟡 Chirimoya con semillas de calabaza♢",
            "🟡 Melón con hojas de menta",
            "🟡 Mamey con canela♢",
        ],
        Desayunos: [
            "🟢 Huevos♢ revueltos con espárragos♢ y cilantro♢",
            "🟢 Omelette con brócoli♢ y ghee♢",
            "🟢 Pan de lino♢ con sardinas♢",
            "🟢 Quinoa♢ con semillas de calabaza♢ y mango♢",
            "🟢 Huevos♢ rancheros con chile jalapeño♢ (sin tomate)",
            "🟢 Caldo de res♢ con verduras y cilantro♢",
            "🟢 Huevos♢ en salsa verde de tomatillo y jalapeño♢",
            "🟡 Clara de huevo♢ con champiñones y hojas de nabo♢",
            "🟡 Mijo♢ con frutas secas y canela♢",
            "🟡 Arroz basmati♢ con ghee♢ y especias",
            "🟡 Chilaquiles con salsa verde y queso manchego♢",
        ],
        Comidas: [
            "🟢 Salmón rey♢ al horno con brócoli♢ y jengibre♢",
            "🟢 Filete de res♢ con camote♢ y curry♢",
            "🟢 Cordero♢ asado con alcachofa♢ y romero",
            "🟢 Trucha arcoíris♢ con hojas de parra♢ y limón",
            "🟢 Carne de res♢ asada con nopal y chile jalapeño♢",
            "🟢 Pozole de venado♢ con col y chile en polvo♢",
            "🟢 Tacos de pescado con brócoli♢ (tortilla de maíz)",
            "🟢 Carnitas de venado♢ con cilantro♢ y cebolla",
            "🟡 Venado♢ a la plancha con kale",
            "🟡 Bacalao♢ con puré de calabaza y ajo",
            "🟡 Arroz salvaje♢ con hígado de res y cebollas",
            "🟡 Sopa de lima con pescado blanco",
        ],
        Colaciones: [
            "🟢 Almendras♢ con chocolate♢ negro",
            "🟢 Apio con mantequilla de almendra♢",
            "🟢 Haba♢ tostada con especias",
            "🟢 Té verde♢ con arándanos rojos♢",
            "🟢 Jícama con chile en polvo♢ y limón",
            "🟢 Toronja♢ con semillas de lino♢",
            "🟢 Totopos de maíz con guacamole (sin tomate)",
            "🟡 Piñones con ghee♢",
            "🟡 Jugo de piña♢ fresca",
            "🟡 Caldo de hueso casero",
            "🟡 Gajos de lima con sal de mar y chile♢",
        ],
        Cenas: [
            "🟢 Sardinas♢ con ensalada de alcachofa♢",
            "🟢 Filete de res♢ con achicoria♢ y ghee♢",
            "🟢 Huevo♢ cocido con brócoli♢ y alga wakame♢",
            "🟢 Lubina♢ al horno con chile jalapeño♢ y jengibre♢",
            "🟢 Tostadas de maíz con carne de res♢ y vegetales",
            "🟢 Ceviche de trucha arcoíris♢ con limón y cilantro♢",
            "🟢 Sopa de lima con sardinas♢ y brócoli♢",
            "🟢 Filete de res♢ relleno de verduras con salsa de chile♢",
            "🟡 Cabra♢ asada con coliflor verde",
            "🟡 Ensalada de diente de león con nueces",
            "🟡 Sopa de algas♢ con verduras de temporada",
            "🟡 Salmón♢ en caldo de jengibre♢ y limón",
        ],
    }

    // Lista de toxinas por categoría, con • para las que requieren 60 días de desintoxicación
    const toxinas = {
        "Carnes Rojas": ["Corazón de res •", "Tocino", "Jamón", "Cerdo"],
        Aves: ["Codorniz", "Hígado de pollo", "Hígado de pato"],
        "Pescados y Mariscos": [
            "Róbalo •",
            "Cangrejo •",
            "Mero •",
            "Abulón",
            "Barracuda",
            "Caracol de mar",
            "Bagre",
            "Pulpo",
            "Calamar",
            "Pez espada",
            "Tortuga",
            "Rana",
        ],
        Lácteos: [
            "Queso cottage •",
            "Queso feta •",
            "Queso mozzarella •",
            "Queso americano",
            "Queso brie",
            "Queso azul",
            "Queso camembert",
            "Queso cheddar",
            "Leche entera de vaca",
            "Yogur",
        ],
        Vegetales: [
            "Aguacate •",
            "Zanahoria •",
            "Coliflor •",
            "Palomitas de maíz •",
            "Puerro •",
            "Lechuga •",
            "Berenjena •",
            "Champiñón marrón •",
            "Aceituna verde •",
            "Espinaca •",
            "Tomate verde •",
            "Tomate •",
            "Pimiento •",
            "Brotes de alfalfa",
            "Coles de Bruselas",
            "Pepino",
        ],
        Frutas: [
            "Manzana •",
            "Albaricoque •",
            "Cereza •",
            "Carne de coco •",
            "Higo •",
            "Uva •",
            "Ciruela •",
            "Granada •",
            "Ciruela pasa •",
            "Pasa •",
            "Pera asiática",
            "Mora",
            "Kiwi",
            "Naranja",
            "Fresa",
        ],
        Bebidas: [
            "Jugo de manzana •",
            "Jugo de remolacha •",
            "Jugo de zanahoria •",
            "Café •",
            "Leche de almendra •",
            "Leche de coco •",
            "Leche de arroz •",
            "Vino tinto •",
            "Vino blanco •",
            "Cerveza",
            "Bebidas de cola",
            "Jugo de naranja",
            "Té negro",
        ],
    }

    // Funciones para drag and drop adaptadas para Framer
    const handleDragStart = (item) => {
        setDraggingItem(item)
    }

    const handleDrop = (day, mealType) => {
        if (draggingItem) {
            const newPlan = { ...mealPlan }
            if (!newPlan[day][mealType].includes(draggingItem)) {
                newPlan[day][mealType] = [
                    ...newPlan[day][mealType],
                    draggingItem,
                ]
                setMealPlan(newPlan)
            }
            setDraggingItem(null)
        }
    }

    const removeItem = (day, mealType, item) => {
        const newPlan = { ...mealPlan }
        newPlan[day][mealType] = newPlan[day][mealType].filter(
            (i) => i !== item
        )
        setMealPlan(newPlan)
    }

    // Función para mostrar el modal con la receta completa
    const showRecipeModal = (recipe) => {
        setModalContent(recipe)
        setModalOpen(true)
    }

    // Función para exportar el plan como CSV
    const exportToCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,"

        // Agregar encabezados
        csvContent += "Tiempo de comida,Horario," + daysOfWeek.join(",") + "\n"

        // Agregar datos
        mealTypes.forEach((mealType) => {
            let row = `${mealType.name},${mealType.time},`
            daysOfWeek.forEach((day) => {
                const meals = mealPlan[day][mealType.name]
                row += `"${meals.join("; ")}"`
                if (day !== daysOfWeek[daysOfWeek.length - 1]) {
                    row += ","
                }
            })
            csvContent += row + "\n"
        })

        // Crear un enlace para descargar
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "Plan_Nutricional_Hunter.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Función para exportar como PDF (usando window.print como solución simple)
    const exportToPDF = () => {
        window.print()
    }

    // Función para guardar en localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem("nutritionalPlan", JSON.stringify(mealPlan))
        alert("Plan guardado correctamente")
    }

    // Función para cargar desde localStorage
    const loadFromLocalStorage = () => {
        const savedPlan = localStorage.getItem("nutritionalPlan")
        if (savedPlan) {
            setMealPlan(JSON.parse(savedPlan))
            alert("Plan cargado correctamente")
        } else {
            alert("No hay plan guardado")
        }
    }

    // Estilos en línea para Framer
    const styles = {
        container: {
            padding: "16px",
            backgroundColor: "#f9fafb",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: "16px",
        },
        headerTitle: {
            fontWeight: "bold",
            fontSize: "20px",
            color: "#16a34a",
        },
        headerSubtitle: {
            fontSize: "14px",
            color: "#4b5563",
        },
        flexWrap: {
            display: "flex",
            flexWrap: "wrap",
            marginTop: "8px",
            fontSize: "12px",
        },
        card: {
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: "16px",
        },
        cardTitle: {
            fontWeight: "bold",
            marginBottom: "8px",
        },
        gridContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
        },
        foodCategory: {
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            overflow: "hidden",
        },
        categoryHeader: {
            backgroundColor: "#fee2e2",
            padding: "4px",
            fontWeight: "500",
            textAlign: "center",
            borderBottom: "1px solid #e5e7eb",
        },
        categoryContent: {
            padding: "8px",
            maxHeight: "160px",
            overflowY: "auto",
        },
        foodItem: {
            backgroundColor: "#f0fdf4",
            padding: "4px",
            marginBottom: "4px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
        },
        toxinTitle: {
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#dc2626",
        },
        toxinCategoryHeader: {
            backgroundColor: "#ef4444",
            color: "white",
            padding: "4px",
            fontWeight: "500",
            textAlign: "center",
            borderBottom: "1px solid #e5e7eb",
        },
        toxinContent: {
            padding: "8px",
            maxHeight: "160px",
            overflowY: "auto",
            backgroundColor: "#fef2f2",
        },
        toxinItem: {
            marginBottom: "4px",
            color: "#991b1b",
            fontSize: "12px",
        },
        planTable: {
            width: "100%",
            borderCollapse: "collapse",
        },
        tableHeader: {
            backgroundColor: "#dbeafe",
            padding: "4px",
            textAlign: "center",
            border: "1px solid #e5e7eb",
        },
        tableMealType: {
            backgroundColor: "#f3f4f6",
            padding: "4px",
            fontWeight: "500",
            border: "1px solid #e5e7eb",
        },
        tableCell: {
            border: "1px solid #e5e7eb",
            padding: "8px",
            verticalAlign: "top",
            height: "100px",
            position: "relative",
        },
        mealItem: {
            backgroundColor: "#d1fae5",
            padding: "4px",
            marginBottom: "4px",
            borderRadius: "4px",
            fontSize: "12px",
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            boxSizing: "border-box",
        },
        mealItemText: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "80%",
            display: "inline-block",
        },
        closeButton: {
            color: "#ef4444",
            marginLeft: "2px",
            fontSize: "12px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "0 3px",
        },
        exportButton: {
            backgroundColor: "#16a34a",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            marginRight: "8px",
        },
        saveButton: {
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            marginRight: "8px",
        },
        loadButton: {
            backgroundColor: "#6366f1",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
        },
        buttonContainer: {
            display: "flex",
            marginTop: "12px",
        },
        modal: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        modalContent: {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "500px",
            width: "90%",
            position: "relative",
        },
        closeButton: {
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
        },
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerTitle}>
                    PLAN NUTRICIONAL GENOTIPO 1 HUNTER
                </div>
                <div style={styles.headerSubtitle}>
                    Datos del perfil | Peso: 74.2 kg | Grasa: 14.1 kg | Músculo:
                    34.4 kg
                </div>
                <div style={styles.flexWrap}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "8px",
                            marginBottom: "4px",
                        }}
                    >
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "9999px",
                                backgroundColor: "#22c55e",
                                marginRight: "4px",
                            }}
                        ></div>
                        <span>Superalimentos (beneficiosos)</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "8px",
                            marginBottom: "4px",
                        }}
                    >
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "9999px",
                                backgroundColor: "#facc15",
                                marginRight: "4px",
                            }}
                        ></div>
                        <span>Alimentos neutros</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "8px",
                            marginBottom: "4px",
                        }}
                    >
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "9999px",
                                backgroundColor: "#ef4444",
                                marginRight: "4px",
                            }}
                        ></div>
                        <span>Evitar (toxinas)</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                        }}
                    >
                        <span style={{ marginRight: "4px" }}>♢</span>
                        <span>
                            Activadores metabólicos (excelentes para pérdida de
                            peso y desarrollo muscular)
                        </span>
                    </div>
                </div>
                <div style={styles.buttonContainer}>
                    <button onClick={exportToCSV} style={styles.exportButton}>
                        Exportar como CSV
                    </button>
                    <button onClick={exportToPDF} style={styles.exportButton}>
                        Imprimir PDF
                    </button>
                    <button
                        onClick={saveToLocalStorage}
                        style={styles.saveButton}
                    >
                        Guardar Plan
                    </button>
                    <button
                        onClick={loadFromLocalStorage}
                        style={styles.loadButton}
                    >
                        Cargar Plan
                    </button>
                </div>
            </div>

            {/* Tabla de planificación */}
            <div style={styles.card}>
                <div style={styles.cardTitle}>Planificador Semanal</div>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.planTable}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}></th>
                                {daysOfWeek.map((day) => (
                                    <th key={day} style={styles.tableHeader}>
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {mealTypes.map((mealType) => (
                                <tr key={mealType.name}>
                                    <td style={styles.tableMealType}>
                                        <div>{mealType.name}</div>
                                        <div
                                            style={{
                                                fontSize: "10px",
                                                color: "#6b7280",
                                            }}
                                        >
                                            {mealType.time}
                                        </div>
                                    </td>
                                    {daysOfWeek.map((day) => (
                                        <td
                                            key={`${day}-${mealType.name}`}
                                            style={styles.tableCell}
                                            onDragOver={(e) =>
                                                e.preventDefault()
                                            }
                                            onDrop={() =>
                                                handleDrop(day, mealType.name)
                                            }
                                        >
                                            {mealPlan[day][mealType.name].map(
                                                (item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        style={styles.mealItem}
                                                        initial={{
                                                            opacity: 0,
                                                            y: -10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                        onClick={() =>
                                                            showRecipeModal(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <span
                                                            style={
                                                                styles.mealItemText
                                                            }
                                                        >
                                                            {item.length > 25
                                                                ? `${item.substring(0, 22)}...`
                                                                : item}
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                removeItem(
                                                                    day,
                                                                    mealType.name,
                                                                    item
                                                                )
                                                            }}
                                                            style={
                                                                styles.closeButton
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    </motion.div>
                                                )
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Platillos recomendados */}
            <div style={styles.card}>
                <div style={styles.cardTitle}>
                    Platillos Recomendados (Arrastre a la tabla)
                </div>
                <p style={{ fontSize: "12px", marginBottom: "8px" }}>
                    🟢 Superalimentos | 🟡 Alimentos neutros | 🔴 Evitar
                </p>
                <div style={styles.gridContainer}>
                    {Object.entries(platillos).map(([category, items]) => (
                        <div key={category} style={styles.foodCategory}>
                            <div style={styles.categoryHeader}>{category}</div>
                            <div style={styles.categoryContent}>
                                {items.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        style={styles.foodItem}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        draggable
                                        onDragStart={() =>
                                            handleDragStart(item)
                                        }
                                        onClick={() => showRecipeModal(item)}
                                    >
                                        {item.length > 25
                                            ? `${item.substring(0, 22)}...`
                                            : item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lista de toxinas */}
            <div style={styles.card}>
                <div style={styles.toxinTitle}>
                    Alimentos a Evitar (Toxinas)
                </div>
                <p style={{ fontSize: "12px", marginBottom: "12px" }}>
                    <span style={{ fontWeight: "600" }}>Punto negro (•):</span>{" "}
                    Evitar por un mínimo de 60 días (período de
                    desintoxicación). Después, pueden reintroducirse
                    cuidadosamente.
                    <br />
                    <span style={{ fontWeight: "600" }}>Sin punto:</span> Evitar
                    regularmente para obtener mejores resultados.
                </p>
                <div style={styles.gridContainer}>
                    {Object.entries(toxinas).map(([category, items]) => (
                        <div key={category} style={styles.foodCategory}>
                            <div style={styles.toxinCategoryHeader}>
                                {category}
                            </div>
                            <div style={styles.toxinContent}>
                                <ul style={{ paddingLeft: "16px" }}>
                                    {items.map((item, idx) => (
                                        <li key={idx} style={styles.toxinItem}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para mostrar recetas completas */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        style={styles.modal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            style={styles.modalContent}
                            initial={{ y: 50, scale: 0.9 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 50, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                style={styles.closeButton}
                                onClick={() => setModalOpen(false)}
                            >
                                ×
                            </button>
                            <h3
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                }}
                            >
                                Receta
                            </h3>
                            <p style={{ fontSize: "16px" }}>{modalContent}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default NutritionalPlanner
