import { nanoid } from "nanoid";
import create from "zustand";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: getLocalStorage('cubes') || [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },
    removeCube: (x, y, z) => {       
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const cubeToRemove = prev.cubes.find(cubee => {
                    const [X, Y, Z] = cubee.pos
                    return X === x && Y === y && Z === z
                })
                return cube.key !== cubeToRemove.key
            })
        }))
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },
    saveWorld: () => {
        setLocalStorage('cubes', useStore.getState().cubes)
    },
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
    }
}))